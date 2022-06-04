import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

// Repository
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// Providers
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não existe.');
    }

    const user = await this.userRepository.findById(userToken.users_id);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareHours = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareHours)) {
      throw new AppError('Token para resetar a senha foi expirado.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
