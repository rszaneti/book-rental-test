import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';

import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;

let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();

    deleteCustomerService = new DeleteCustomerService(fakeCustomerRepository);
  });

  it('should be able to delete the user', async () => {
    const createReg1 = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email.com.br',
      cellphone: '51999999999',
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);

    const createReg2 = await fakeCustomerRepository.create({
      files_id: '1',
      name: 'Rodrigo Zaneti',
      email: 'email@email1.com.br',
      cellphone: '51999999999',
    });

    await deleteCustomerService.execute({ customers_id: createReg2.id });

    const list = await fakeCustomerRepository.findAllCustomers({
      sort_field: '',
      sort_order: '',
      page: 1,
      rowsperpage: 15,
    });

    expect(JSON.stringify(createRegsUnion)).toBe(JSON.stringify(list));
  });
});
