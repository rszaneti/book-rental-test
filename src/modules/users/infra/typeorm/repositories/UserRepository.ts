import { getRepository, Repository } from 'typeorm';

// Repositories
import IUserRepository from '@modules/users/repositories/IUserRepository';

// DTOs
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// Entities
import User from '../entities/User';

interface IFindRequest {
  search_username: string;
  search_name: string;
  sort_field: string;
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllUsers({
    search_username,
    search_name,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindRequest): Promise<User[] | undefined> {
    // campo a ser ordenado
    let sort_field_data = 'u.username';

    if (sort_field === 'name') {
      sort_field_data = 'u.name';
    } else if (sort_field === 'email') {
      sort_field_data = 'u.email';
    } else if (sort_field === 'created_at') {
      sort_field_data = 'u.created_at';
    }

    const list = await this.ormRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.file', 'f')
      .where(
        search_username
          ? 'LOWER(u.username) like LOWER(:search_username)'
          : '1=1',
        {
          search_username: `%${search_username}%`,
        },
      )
      .andWhere(
        search_name ? 'LOWER(u.name) like LOWER(:search_name)' : '1=1',
        {
          search_name: `%${search_name}%`,
        },
      )
      .orderBy(sort_field_data, sort_order, 'NULLS FIRST')
      .take(rowsperpage)
      .skip((page - 1) * rowsperpage)
      .getMany();

    return list;
  }

  public async findTotalAllUsers({
    search_username,
    search_name,
  }: IFindRequest): Promise<number> {
    const countList = await this.ormRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.file', 'f')
      .where(
        search_username
          ? 'LOWER(u.username) like LOWER(:search_username)'
          : '1=1',
        {
          search_username: `%${search_username}%`,
        },
      )
      .andWhere(
        search_name ? 'LOWER(u.name) like LOWER(:search_name)' : '1=1',
        {
          search_name: `%${search_name}%`,
        },
      )
      .getCount();

    return countList;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.file', 'file')
      .where('u.id = :id', { id })
      .getOne();

    return findReg;
  }

  public async findByUserName(username: string): Promise<User | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.file', 'file')
      .where('LOWER(u.username) = LOWER(:username)', { username })
      .getOne();

    return findReg;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.file', 'file')
      .where('LOWER(u.email) = LOWER(:email)', { email })
      .getOne();

    return findReg;
  }

  public async create({
    files_id,
    username,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const createReg = this.ormRepository.create({
      files_id,
      username,
      name,
      email,
      password,
    });

    await this.ormRepository.save(createReg);

    return createReg;
  }

  public async save(saveReg: User): Promise<User> {
    return this.ormRepository.save(saveReg);
  }

  public async updateFile(users_id: string, files_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({ files_id })
      .where('id = :users_id', { users_id })
      .execute();
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserRepository;
