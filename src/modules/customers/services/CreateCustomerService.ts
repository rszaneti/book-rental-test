import { inject, injectable } from 'tsyringe';
import path from 'path';

// Repository
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

// Entities
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

// Providers
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
  name: string;
  email: string;
  cellphone: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    files_id,
    name,
    email,
    cellphone,
  }: IRequest): Promise<Customer> {
    const checkCustomerExist = await this.customerRepository.findByEmail(email);

    if (checkCustomerExist) {
      throw new AppError('E-mail já cadastrado.');
    }

    const createReg = this.customerRepository.create({
      files_id,
      name,
      email,
      cellphone,
    });

    // Send mail customer from password
    const registerCustomerTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'register_customer.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'Bem vindos!',
      templateData: {
        file: registerCustomerTemplate,
        variables: {
          name,
        },
      },
    });

    return createReg;
  }
}

export default CreateCustomerService;
