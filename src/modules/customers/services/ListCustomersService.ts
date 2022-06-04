import { inject, injectable } from 'tsyringe';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// Entities
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IRequest {
  search_name?: string;
  search_email?: string;
  search_cellphone?: string;
  sort_field: 'name' | 'email' | 'cellphone';
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    search_name,
    search_email,
    search_cellphone,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IRequest): Promise<Customer[] | undefined> {
    const list = await this.customerRepository.findAllCustomers({
      search_name,
      search_email,
      search_cellphone,
      sort_field,
      sort_order,
      page,
      rowsperpage,
    });

    return list;
  }
}

export default ListCustomersService;
