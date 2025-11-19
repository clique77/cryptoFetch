import { FastifyRequest, FastifyReply } from 'fastify';
import { Logger } from 'pino';
import { LoginUserDTO, RegisterUserDTO } from '../../application/dto';
import { container } from '../di/container';

interface ReqisterRequestBody {
  email: string;
  password: string;
  accountName: string;
}

interface LoginRequestBody {
  email: string;
  password: string
}

class AuthController {
  public async register(request: FastifyRequest<{ Body: ReqisterRequestBody }>, reply: FastifyReply): Promise<void> {
    const { email, password, accountName } = request.body;
    const logger = request.log as Logger;
    const registerDTO = new RegisterUserDTO(email, password, accountName);
    const registerUserUseCase = container.getRegisterUserUseCase(logger);
    const result = await registerUserUseCase.execute(registerDTO);

    reply.status(201).send({
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        accountName: result.user.accountName,
        createdAt: result.user.createdAt.toISOString(),
      },
    });
  }

  public async login(request: FastifyRequest<{ Body: LoginRequestBody }>, reply: FastifyReply) {
    const { email, password } = request.body;
    const logger = request.log as Logger;
    const loginDTO = new LoginUserDTO(email, password);
    const loginUseCase = container.getLoginUserUseCase(logger);
    const result = await loginUseCase.execute(loginDTO);

    reply.status(200).send({
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        accountName: result.user.accountName,
        createdAt: result.user.createdAt.toISOString(),
      },
    });
  }
}

export const authController = new AuthController();