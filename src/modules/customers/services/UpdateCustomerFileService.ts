import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
  customers_id: string;
}

@injectable()
class UpdateCustomerFileService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    customers_id,
    files_id,
  }: IRequest): Promise<Customer> {
    const userAuth = await this.customerRepository.findById(customers_id);

    if (!userAuth) {
      throw new AppError(
        'Somente cliente autenticado pode alterar o avatar.',
        401,
      );
    }

    try {
      await this.customerRepository.updateFile(customers_id, files_id);
    } catch (err: any) {
      throw new AppError(`Houve uma falha ao gravar a imagem. ${err.message}`);
    }

    const reg = await this.customerRepository.findById(customers_id);

    if (!reg) {
      throw new AppError('Usuário não localizado.');
    }

    return reg;
  }
}

export default UpdateCustomerFileService;
