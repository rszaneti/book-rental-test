import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let fakeMailProvider: FakeMailProvider;

let createCustomerService: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    fakeMailProvider = new FakeMailProvider();

    createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeMailProvider,
    );
  });

  it('should be able to create a new customer', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const createReg = await createCustomerService.execute({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    expect(createReg).toHaveProperty('id');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to create a new customer with the same email another', async () => {
    await createCustomerService.execute({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    expect(
      createCustomerService.execute({
        files_id: '1',
        name: 'Rodrigo Zaneti',
        email: 'email@email.com.br',
        cellphone: '51999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
