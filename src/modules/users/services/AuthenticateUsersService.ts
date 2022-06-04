import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

// Repository
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

// Models
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new AppError('Usuário ou senha estão incorretos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Usuário ou senha estão incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt_user;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUsersService;
