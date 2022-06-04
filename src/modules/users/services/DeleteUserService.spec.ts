import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import DeleteUserService from './DeleteUserService';

let fakeUserRepository: FakeUserRepository;

let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    deleteUserService = new DeleteUserService(fakeUserRepository);
  });

  it('should be able to delete the user', async () => {
    const createReg1 = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);

    const createReg2 = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    await deleteUserService.execute({ users_id: createReg2.id });

    const list = await fakeUserRepository.findAllUsers({
      search_username: '',
      search_name: '',
      sort_field: '',
      sort_order: '',
      page: 0,
      rowsperpage: 0,
    });

    expect(JSON.stringify(createRegsUnion)).toBe(JSON.stringify(list));
  });
});
