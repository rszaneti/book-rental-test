import { inject, injectable } from 'tsyringe';

// DTOs
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
class ListTotalUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    search_username,
    search_name,
  }: IFindUserDTO): Promise<number> {
    const countRegs = await this.userRepository.findTotalAllUsers({
      search_username,
      search_name,
    });

    return countRegs;
  }
}

export default ListTotalUsersService;
