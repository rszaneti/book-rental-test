import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ListUsersService from './ListUsersService';

let fakeUserRepository: FakeUserRepository;

let listUsersService: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listUsersService = new ListUsersService(fakeUserRepository);
  });

  it('should be able to list the users', async () => {
    const createReg1 = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const createReg2 = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti1',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept1.com.br',
      password: '12345',
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);
    createRegsUnion.push(createReg2);

    const list = await listUsersService.execute({
      search_username: '',
      search_name: '',
      sort_field: '',
      sort_order: '',
      page: 0,
      rowsperpage: 0,
    });

    expect(JSON.stringify(list)).toBe(JSON.stringify(createRegsUnion));
  });
});
