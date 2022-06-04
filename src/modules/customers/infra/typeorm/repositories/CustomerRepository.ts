import { getRepository, Repository } from 'typeorm';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// DTOs
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

// Entities
import Customer from '../entities/Customer';

interface IRequest {
  search_name?: string;
  search_email?: string;
  search_cellphone?: string;
  sort_field: 'name' | 'email' | 'cellphone';
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAllCustomers({
    search_name,
    search_email,
    search_cellphone,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IRequest): Promise<Customer[] | undefined> {
    const list = await this.ormRepository
      .createQueryBuilder('c')
      .where(search_email ? 'LOWER(c.name) like LOWER(:search_name)' : '1=1', {
        search_name: `%${search_name}%`,
      })
      .andWhere(
        search_email ? 'LOWER(c.email) like LOWER(:search_email)' : '1=1',
        {
          search_email: `%${search_email}%`,
        },
      )
      .andWhere(
        search_cellphone
          ? 'LOWER(c.cellphone) like LOWER(:search_cellphone)'
          : '1=1',
        {
          search_cellphone: `%${search_cellphone}%`,
        },
      )
      .orderBy(`c.${sort_field}`, sort_order, 'NULLS FIRST')
      .take(rowsperpage)
      .skip((page - 1) * rowsperpage)
      .getMany();

    return list;
  }

  public async findTotalAllCustomers({
    search_name,
    search_email,
    search_cellphone,
  }: IRequest): Promise<number> {
    const countReg = await this.ormRepository
      .createQueryBuilder('c')
      .where(search_email ? 'LOWER(c.name) like LOWER(:search_name)' : '1=1', {
        search_name: `%${search_name}%`,
      })
      .andWhere(
        search_email ? 'LOWER(c.email) like LOWER(:search_email)' : '1=1',
        {
          search_email: `%${search_email}%`,
        },
      )
      .andWhere(
        search_cellphone
          ? 'LOWER(c.cellphone) like LOWER(:search_cellphone)'
          : '1=1',
        {
          search_cellphone: `%${search_cellphone}%`,
        },
      )
      .getCount();

    return countReg;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.file', 'f')
      .where('c.id = :id', { id })
      .getOne();

    return findReg;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.file', 'f')
      .where('LOWER(c.email) = LOWER(:email)', { email })
      .getOne();

    return findReg;
  }

  public async create({
    files_id,
    name,
    email,
    cellphone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const createReg = this.ormRepository.create({
      files_id,
      name,
      email,
      cellphone,
    });

    const reg = await this.ormRepository.save(createReg);

    return reg;
  }

  public async save(saveReg: Customer): Promise<Customer> {
    return this.ormRepository.save(saveReg);
  }

  public async updateFile(
    customers_id: string,
    files_id: string,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Customer)
      .set({ files_id })
      .where('id = :customers_id', { customers_id })
      .execute();
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CustomerRepository;
