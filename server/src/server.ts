import Fastify from 'fastify';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { setupErrorHandler } from './presentation/middleware/errorHandler';
import { registerAuthRoutes } from './presentation/routes/authRoutes';
import cors from '@fastify/cors';

class Server {
  private fastify: FastifyInstance;
  private readonly port: number;
  private readonly host: string;

  constructor(port: number = 3000, host: string = '0.0.0.0') {
    this.fastify = Fastify({ logger: true });
    this.port = port;
    this.host = host;

    this.setupCORS();
    this.setupErrorHandler();
    this.setupRoutes();
  }

  public async start(): Promise<void> {
    try {
      await this.fastify.listen({ port: this.port, host: this.host });
      console.log(`Server is running on port ${this.port}`);
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    await this.fastify.close();
    console.log('Server stopped');
  }

  private setupErrorHandler(): void {
    setupErrorHandler(this.fastify);
  }

  private setupRoutes(): void {
    this.fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
      return { message: 'CryptoFetch API is running' };
    });

    this.fastify.register(async (fastify) => {
      await registerAuthRoutes(fastify);
    }, { prefix: '/auth' });
  }

  private async setupCORS(): Promise<void> {
    await this.fastify.register(cors, {
      origin: true,
      credentials: true,
    })
  }
}

const server = new Server();
server.start();
