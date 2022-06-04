import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

import ListTotalCustomersService from './ListTotalCustomersService';

let fakeCustomerRepository: FakeCustomerRepository;

let listTotalCustomersService: ListTotalCustomersService;

describe('ListTotalCustomers', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    listTotalCustomersService = new ListTotalCustomersService(
      fakeCustomerRepository,
    );
  });

  it('should be able to list the customers', async () => {
    const createReg1 = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    const createReg2 = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email1.com.br',
      cellphone: '51999999999',
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);
    createRegsUnion.push(createReg2);

    const countRegs = await listTotalCustomersService.execute({
      search_name: '',
      search_email: '',
      search_cellphone: '',
    });

    expect(countRegs).toBe(createRegsUnion.length);
  });
});
