import { inject, injectable } from 'tsyringe';

// Repositories
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// Entities
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import AppError from '@shared/errors/AppError';

interface IRequest {
  customers_id: string;
  name: string;
  email: string;
  cellphone: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    customers_id,
    name,
    email,
    cellphone,
  }: IRequest): Promise<Customer> {
    const findReg = await this.customerRepository.findById(customers_id);

    if (!findReg) {
      throw new AppError('Cliente não localizado.');
    }

    const checkCustomerExist = await this.customerRepository.findByEmail(email);

    if (checkCustomerExist && checkCustomerExist.id !== customers_id) {
      throw new AppError('E-mail já cadastrado.');
    }

    findReg.name = name;
    findReg.email = email;
    findReg.cellphone = cellphone;

    const updateReg = await this.customerRepository.save(findReg);

    return updateReg;
  }
}

export default UpdateCustomerService;
