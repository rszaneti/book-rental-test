import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const createReg = await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    expect(createReg).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same user name another', async () => {
    await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    expect(
      createUserService.execute({
        files_id: '1',
        username: 'rszaneti',
        name: 'Rodrigo Zaneti',
        email: 'rodrigo@eadconcept.com.br',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the same email another', async () => {
    await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    expect(
      createUserService.execute({
        files_id: '1',
        username: 'rszanetis',
        name: 'Rodrigo Zaneti',
        email: 'rodrigo@eadconcept.com.br',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
