import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ListTotalUsersService from './ListTotalUsersService';

let fakeUserRepository: FakeUserRepository;

let listTotalUsersService: ListTotalUsersService;

describe('ListTotalUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listTotalUsersService = new ListTotalUsersService(fakeUserRepository);
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
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);
    createRegsUnion.push(createReg2);

    const list = await listTotalUsersService.execute({
      search_username: '',
      search_name: '',
    });

    expect(list).toBe(createRegsUnion.length);
  });
});
