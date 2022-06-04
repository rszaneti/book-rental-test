import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

export default interface IUserRepository {
  findAllUsers({
    search_username,
    search_name,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindUserDTO): Promise<User[] | undefined>;
  findTotalAllUsers({
    search_username,
    search_name,
  }: IFindUserDTO): Promise<number>;
  findById(id: string): Promise<User | undefined>;
  findByUserName(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  updateFile(users_id: string, files_id: string): Promise<void>;
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
}
