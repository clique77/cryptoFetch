import { Pool } from 'pg';
import { config } from '../../config';
import { QueryResultRow } from 'pg';

class PostgresConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (error) => {
      console.error('Postgres connection error: ', error);
      process.exit(1);
    });
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }

  public async testConnection(): Promise<boolean> {
    try {
      const result = await this.pool.query<QueryResultRow>('SELECT NOW()');
      return true;
    } catch (error) {
      console.error('Database connection test failed: ', error);
      return false;
    }
  }
}

export default new PostgresConnection();