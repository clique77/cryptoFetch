import IUserRepository from "../../domain/repositories/IUserRepository";
import User from "../../domain/entities/User";
import PostgresConnection from "../database/PostgresConnection";
import { DatabaseException } from "../../domain/exceptions/repository";
import { Pool, QueryResult, QueryResultRow } from "pg";
import { Logger } from "pino";

export class PostgresUserRepository implements IUserRepository {
  private pool: Pool;
  private logger: Logger;

  constructor(logger: Logger) {
    this.pool = PostgresConnection.getPool();
    this.logger = logger;
  }

  public async findById(id: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await this.pool.query<QueryResultRow>(query, [id]);
      return this.mapQueryResultToUser(result);
    } catch (error) {
      this.logger.error({ error, id }, 'Error finding user by id');
      throw new DatabaseException('Failed to find user by id', error as Error);
    }
  }

  public async findByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await this.pool.query<QueryResultRow>(query, [email]);
      return this.mapQueryResultToUser(result);
    } catch (error) {
      this.logger.error({ error, email }, 'Error finding user by email');
      throw new DatabaseException('Failed to find user by email', error as Error);
    }
  }

  public async save(user: User): Promise<void> {
    try {
      const query = `
        INSERT INTO users (id, email, password_hash, account_name, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id)
        DO UPDATE SET
          email = EXCLUDED.email,
          password_hash = EXCLUDED.password_hash,
          account_name = EXCLUDED.account_name,
          updated_at = EXCLUDED.updated_at
      `;
      await this.pool.query<QueryResultRow>(query, [user.id, user.getEmail(), user.getPasswordHash(), user.getAccountName(), user.createdAt, user.getUpdatedAt()]);
    } catch (error) {
      this.logger.error({ error, user }, 'Error saving user');
      throw new DatabaseException('Failed to save user', error as Error);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      await this.pool.query<QueryResultRow>(query, [id]);
    } catch(error) {
      this.logger.error({ error, id }, 'Error deleting user');
      throw new DatabaseException('Failed to delete user', error as Error);
    }
  }

  private mapToUser(row: QueryResultRow): User {
    const id = row.id;
    const email = row.email;
    const passwordHash = row.password_hash;
    const accountName = row.account_name;
    const createdAt = new Date(row.created_at);
    const updatedAt = new Date(row.updated_at);

    return User.restore(id, email, passwordHash, accountName, createdAt, updatedAt);
  }

  private mapQueryResultToUser(result: QueryResult<QueryResultRow>): User | null {
    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    return this.mapToUser(row);
  }
}