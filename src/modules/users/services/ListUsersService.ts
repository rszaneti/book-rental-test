import { inject, injectable } from 'tsyringe';

// DTOs
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// Entities
import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

@injectable()
class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    search_username,
    search_name,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindUserDTO): Promise<User[]> {
    const list = await this.userRepository.findAllUsers({
      search_username,
      search_name,
      sort_field,
      sort_order,
      page,
      rowsperpage,
    });

    if (!list) {
      throw new AppError('Usuário(s) não localizado(s).');
    }

    return list;
  }
}

export default ListUsersService;
