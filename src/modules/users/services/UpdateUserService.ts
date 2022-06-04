import { inject, injectable } from 'tsyringe';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

// Providers
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  users_id: string;
  username: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    users_id,
    username,
    name,
    email,
  }: IRequest): Promise<User> {
    const reg = await this.userRepository.findById(users_id);

    if (!reg) {
      throw new AppError('Usuário não localizado.');
    }

    const checkUsernameExist = await this.userRepository.findByUserName(
      username,
    );
    if (checkUsernameExist && checkUsernameExist.id !== users_id) {
      throw new AppError('Usuário já cadastrado.');
    }

    const checkEmailExist = await this.userRepository.findByEmail(email);
    if (checkEmailExist && checkEmailExist.id !== users_id) {
      throw new AppError('E-mail já cadastrado.');
    }

    reg.username = username;
    reg.name = name;
    reg.email = email;

    const updateReg = await this.userRepository.save(reg);

    return updateReg;
  }
}

export default UpdateUserService;
