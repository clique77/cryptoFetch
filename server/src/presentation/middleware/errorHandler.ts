import { FastifyError, FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ApplicationException, ValidationException } from '../../application/exceptions';
import { DomainException } from '../../domain/exceptions/DomainException';
import { APPLICATION_ERROR_CODES } from '../../constants';

export function setupErrorHandler(fastify: FastifyInstance): void {
  fastify.setErrorHandler((
    error: FastifyError | Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    if (error instanceof ValidationException) {
      reply.status(400).send({
        error: {
          message: error.message,
          code: error.code,
          timestamp: error.timestamp.toISOString(),
        },
      });
      return;
    }

    if (error instanceof ApplicationException) {
      if (error.code === APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS) {
        reply.status(409).send({
          error: {
            message: error.message,
            code: error.code,
            timestamp: error.timestamp.toISOString(),
          },
        });
        return;
      }

      if (error.code === APPLICATION_ERROR_CODES.INVALID_CREDENTIALS) {
        reply.status(401).send({
          error: {
            message: error.message,
            code: error.code,
            timestamp: error.timestamp.toISOString(),
          },
        });
        return;
      }

      reply.status(400).send({
        error: {
          message: error.message,
          code: error.code,
          timestamp: error.timestamp.toISOString(),
        },
      });
      return;
    }

    if (error instanceof DomainException) {
      reply.status(400).send({
        error: {
          message: error.message,
          code: error.code,
          timestamp: error.timestamp.toISOString(),
        },
      });
      return;
    }

    if ('validation' in error && error.validation) {
      reply.status(400).send({
        error: {
          message: 'Validation error',
          code: APPLICATION_ERROR_CODES.VALIDATION_ERROR,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    fastify.log.error({ error, request }, 'Unhandled error');
    reply.status(500).send({
      error: {
        message: 'Internal server error',
        code: APPLICATION_ERROR_CODES.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
      },
    });
  });
}