import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUsersService from './AuthenticateUsersService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;
let authenticateUsersService: AuthenticateUsersService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    authenticateUsersService = new AuthenticateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const createReg = await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const response = await authenticateUsersService.execute({
      username: 'rszaneti',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(createReg);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUsersService.execute({
        username: 'zanetis',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    expect(
      authenticateUsersService.execute({
        username: 'rszaneti',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
