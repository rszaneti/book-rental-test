import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateUserService from './UpdateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserService = new UpdateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user', async () => {
    const createReg = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const updateReg = await updateUserService.execute({
      users_id: createReg.id,
      files_id: '1',
      username: 'rszaneti1',
      name: 'Rodrigo S Zan',
      email: 'rodrigo@ead.com.br',
    });

    expect(updateReg.username).toBe('rszaneti1');
    expect(updateReg.name).toBe('Rodrigo S Zan');
    expect(updateReg.email).toBe('rodrigo@ead.com.br');
  });

  it('should not be able change to non-existing user', async () => {
    await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti1',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept1.com.br',
      password: '12345',
    });

    await expect(
      updateUserService.execute({
        users_id: '12',
        files_id: '1',
        username: 'rszaneti1',
        name: 'Rodrigo Zaneti',
        email: 'rodrigo@eadconcept1.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change to another user name', async () => {
    await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const createReg = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti1',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept1.com.br',
      password: '12345',
    });

    await expect(
      updateUserService.execute({
        users_id: createReg.id,
        files_id: '1',
        username: 'rszaneti',
        name: 'Rodrigo Zaneti',
        email: 'rodrigo@eadconcept1.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change to another email', async () => {
    await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const createReg = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti1',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept1.com.br',
      password: '12345',
    });

    await expect(
      updateUserService.execute({
        users_id: createReg.id,
        files_id: '1',
        username: 'rszaneti1',
        name: 'Rodrigo Zaneti',
        email: 'rodrigo@eadconcept.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
