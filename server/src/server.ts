import Fastify from 'fastify';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

class Server {
  private fastify: FastifyInstance;
  private readonly port: number;
  private readonly host: string;

  constructor(port: number = 3000, host: string = '0.0.0.0') {
    this.fastify = Fastify({ logger: true });
    this.port = port;
    this.host = host;
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

  private setupRoutes(): void {
    this.fastify.get('/', async (_request: FastifyRequest, _reply: FastifyReply) => {
      return { message: 'Привет' };
    })
  }
}

const server = new Server();
server.start();
