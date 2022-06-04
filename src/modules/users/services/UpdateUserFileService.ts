import { inject, injectable } from 'tsyringe';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
  users_id: string;
}

@injectable()
class UpdateUserFileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ users_id, files_id }: IRequest): Promise<User> {
    const userAuth = await this.userRepository.findById(users_id);

    if (!userAuth) {
      throw new AppError(
        'Somente usuário autenticado pode alterar o avatar.',
        401,
      );
    }

    try {
      await this.userRepository.updateFile(users_id, files_id);
    } catch (err: any) {
      throw new AppError(`Houve uma falha ao gravar a imagem. ${err.message}`);
    }

    const reg = await this.userRepository.findById(users_id);

    if (!reg) {
      throw new AppError('Usuário não localizado.');
    }

    return reg;
  }
}

export default UpdateUserFileService;
