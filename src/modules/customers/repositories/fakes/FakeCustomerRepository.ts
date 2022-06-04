/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// DTOs
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import IFindCustomerDTO from '@modules/customers/dtos/IFindCustomerDTO';

// Entities
import Customer from '../../infra/typeorm/entities/Customer';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async findAllCustomers({
    search_name,
    search_email,
    search_cellphone,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindCustomerDTO): Promise<Customer[] | undefined> {
    const { customers } = this;

    return customers;
  }

  public async findTotalAllCustomers({
    search_name,
    search_email,
    search_cellphone,
  }: IFindCustomerDTO): Promise<number> {
    const { customers } = this;

    return customers.length;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findReg = this.customers.find(r => r.id === id);

    return findReg;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findReg = this.customers.find(r => r.email === email);

    return findReg;
  }

  public async create({
    files_id,
    name,
    email,
    cellphone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const createReg = new Customer();

    Object.assign(createReg, {
      id: uuidv4(),
      files_id,
      name,
      email,
      cellphone,
    });

    this.customers.push(createReg);

    return createReg;
  }

  public async save(saveReg: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(r => r.id === saveReg.id);

    this.customers[findIndex] = saveReg;

    return saveReg;
  }

  public async updateFile(
    customers_id: string,
    files_id: string,
  ): Promise<void> {
    const findRegs = this.customers.filter(r => r.id === customers_id);

    if (findRegs) {
      const data = findRegs.map(u => {
        return { ...u, files_id };
      });

      const findIndex = this.customers.findIndex(r => r.id === data[0].id);

      this.customers[findIndex].files_id = data[0].files_id;
    }
  }

  public async delete(id: string): Promise<void> {
    const filterReg = this.customers.filter(r => r.id !== id);

    this.customers = filterReg;
  }
}

export default FakeCustomerRepository;
