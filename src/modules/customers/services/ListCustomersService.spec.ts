import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

import ListCustomersService from './ListCustomersService';

let fakeCustomerRepository: FakeCustomerRepository;

let listCustomersService: ListCustomersService;

describe('ListCustomers', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    listCustomersService = new ListCustomersService(fakeCustomerRepository);
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

    const list = await listCustomersService.execute({
      search_name: '',
      search_email: '',
      search_cellphone: '',
      sort_field: 'name',
      sort_order: 'ASC',
      page: 1,
      rowsperpage: 15,
    });

    expect(JSON.stringify(list)).toBe(JSON.stringify(createRegsUnion));
  });
});
