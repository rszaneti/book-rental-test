import { inject, injectable } from 'tsyringe';

// DTOs
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// Repository
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

// Models
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    files_id,
    username,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExist = await this.userRepository.findByUserName(username);

    if (checkUserExist) {
      throw new AppError('Usuário já cadastrado.');
    }

    const checkEmailExist = await this.userRepository.findByEmail(email);

    if (checkEmailExist) {
      throw new AppError('E-mail já cadastrado.');
    }

    const hashedPass = await this.hashProvider.generateHash(password);

    const createReg = this.userRepository.create({
      files_id,
      username,
      name,
      email,
      password: hashedPass,
    });

    return createReg;
  }
}

export default CreateUserService;
