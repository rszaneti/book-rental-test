/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// DTOs
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';

// Entities
import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllUsers({
    search_username,
    search_name,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindUserDTO): Promise<User[] | undefined> {
    const { users } = this;

    return users;
  }

  public async findTotalAllUsers({
    search_username,
    search_name,
  }: IFindUserDTO): Promise<number> {
    const { users } = this;

    return users.length;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findReg = this.users.find(r => r.id === id);

    return findReg;
  }

  public async findByUserName(username: string): Promise<User | undefined> {
    const findReg = this.users.find(r => r.username === username);

    return findReg;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findReg = this.users.find(r => r.email === email);

    return findReg;
  }

  public async create({
    files_id,
    username,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const createReg = new User();

    Object.assign(createReg, {
      id: uuidv4(),
      files_id,
      username,
      name,
      email,
      password,
    });

    this.users.push(createReg);

    return createReg;
  }

  public async updateFile(users_id: string, files_id: string): Promise<void> {
    const findRegs = this.users.filter(findUser => findUser.id === users_id);

    if (findRegs) {
      const data = findRegs.map(u => {
        return { ...u, files_id };
      });

      const findIndex = this.users.findIndex(r => r.id === data[0].id);

      this.users[findIndex].files_id = data[0].files_id;
    }
  }

  public async save(saveReg: User): Promise<User> {
    const findIndex = this.users.findIndex(r => r.id === saveReg.id);

    this.users[findIndex] = saveReg;

    return saveReg;
  }

  public async delete(id: string): Promise<void> {
    const filterRegs = this.users.filter(r => r.id !== id);
    this.users = filterRegs;
  }
}

export default FakeUserRepository;
