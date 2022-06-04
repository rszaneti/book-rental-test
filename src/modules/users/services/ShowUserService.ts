import { inject, injectable } from 'tsyringe';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  users_id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ users_id }: IRequest): Promise<User> {
    const reg = await this.userRepository.findById(users_id);

    if (!reg) {
      throw new AppError('Usuário não localizado.');
    }

    return reg;
  }
}

export default ShowUserService;
