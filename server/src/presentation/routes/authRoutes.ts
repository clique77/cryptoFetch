import { FastifyInstance } from 'fastify';
import { authController } from '../contollers/AuthController';

export async function registerAuthRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/register', authController.register.bind(authController));
  fastify.post('/login', authController.login.bind(authController));
}