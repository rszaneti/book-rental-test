import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ShowUserService from './ShowUserService';

let fakeUserRepository: FakeUserRepository;

let showUserService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showUserService = new ShowUserService(fakeUserRepository);
  });

  it('should be able to show the user', async () => {
    const createReg = await fakeUserRepository.create({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    const showReg = await showUserService.execute({
      users_id: createReg.id,
    });

    expect(showReg.username).toBe('rszaneti');
    expect(showReg.name).toBe('Rodrigo Zaneti');
    expect(showReg.email).toBe('rodrigo@eadconcept.com.br');
  });
});

it('should not be able show to non-existing user', async () => {
  await fakeUserRepository.create({
    files_id: '1',
    username: 'rszaneti',
    name: 'Rodrigo Zaneti',
    email: 'rodrigo@eadconcept.com.br',
    password: '12345',
  });

  await expect(
    showUserService.execute({
      users_id: '12',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
