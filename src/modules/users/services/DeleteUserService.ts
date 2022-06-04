import { inject, injectable } from 'tsyringe';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  users_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ users_id }: IRequest): Promise<void> {
    try {
      if (users_id === '42762011-4a37-4b37-bad8-12d19fa947ea') {
        throw new AppError('Não é permitido deletar o usuário principal.');
      }

      await this.userRepository.delete(users_id);
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
}

export default DeleteUserService;
