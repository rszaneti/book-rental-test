import AppError from '@shared/errors/AppError';

import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;

let updateCustomerService: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    updateCustomerService = new UpdateCustomerService(fakeCustomerRepository);
  });

  it('should be able to update the customer', async () => {
    const createReg = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    const updateReg = await updateCustomerService.execute({
      customers_id: createReg.id,
      name: 'Rodrigo Silva Zaneti',
      email: 'email@email1.com.br',
      cellphone: '51999999999',
    });

    expect(updateReg.name).toBe('Rodrigo Silva Zaneti');
    expect(updateReg.email).toBe('email@email1.com.br');
  });

  it('should not be able change to non-existing customer', async () => {
    await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Silva Zaneti',
      email: 'email@email1.com.br',
      cellphone: '51999999999',
    });

    await expect(
      updateCustomerService.execute({
        customers_id: '12',
        name: 'Rodrigo Silva Zaneti',
        email: 'email@email1.com.br',
        cellphone: '51999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change to another customer email', async () => {
    await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    const createReg = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email1.com.br',
      cellphone: '51999999999',
    });

    await expect(
      updateCustomerService.execute({
        customers_id: createReg.id,
        name: 'Rodrigo Zaneti',
        email: 'email@email.com.br',
        cellphone: '51999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
