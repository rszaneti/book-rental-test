import AppError from '@shared/errors/AppError';
import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

import ShowCustomerService from './ShowCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;

let showCustomerService: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    showCustomerService = new ShowCustomerService(fakeCustomerRepository);
  });

  it('should be able to show the customer', async () => {
    const createReg = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    const showReg = await showCustomerService.execute({
      customers_id: createReg.id,
    });

    expect(showReg.name).toBe('Rodrigo Zaneti');
    expect(showReg.email).toBe('email@email.com.br');
    expect(showReg.cellphone).toBe('51999999999');
  });
});

it('should not be able show to non-existing customer', async () => {
  await fakeCustomerRepository.create({
    files_id: '1',
    name: 'Rodrigo Zaneti',
    email: 'email@email.com.br',
    cellphone: '51999999999',
  });

  await expect(
    showCustomerService.execute({
      customers_id: '12',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
