import { inject, injectable } from 'tsyringe';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// Entities
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import AppError from '@shared/errors/AppError';

interface IRequest {
  customers_id: string;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ customers_id }: IRequest): Promise<Customer> {
    const findReg = await this.customerRepository.findById(customers_id);

    if (!findReg) {
      throw new AppError('Cliente não localizado.');
    }

    return findReg;
  }
}

export default ShowCustomerService;
