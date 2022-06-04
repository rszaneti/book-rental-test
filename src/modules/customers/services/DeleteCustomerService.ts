import { inject, injectable } from 'tsyringe';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  customers_id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ customers_id }: IRequest): Promise<void> {
    try {
      return this.customerRepository.delete(customers_id);
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
}

export default DeleteCustomerService;
