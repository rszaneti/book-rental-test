import { inject, injectable } from 'tsyringe';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

interface IRequest {
  search_name?: string;
  search_email?: string;
  search_cellphone?: string;
}

@injectable()
class ListTotalCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    search_name,
    search_email,
    search_cellphone,
  }: IRequest): Promise<number> {
    const countRegs = await this.customerRepository.findTotalAllCustomers({
      search_name,
      search_email,
      search_cellphone,
    });

    return countRegs;
  }
}

export default ListTotalCustomersService;
