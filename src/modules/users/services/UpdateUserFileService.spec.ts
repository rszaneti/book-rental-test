import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeFileRepository from '../../parameters/files/repositories/fakes/FakeFileRepository';

import CreateFileService from '../../parameters/files/services/CreateFileService';
import CreateUserService from './CreateUserService';
import UpdateUserFileService from './UpdateUserFileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeFileRepository: FakeFileRepository;
let fakeStorageProvider: FakeStorageProvider;

let createFileService: CreateFileService;
let createUserService: CreateUserService;
let updateUserFileService: UpdateUserFileService;

describe('UpdateUserFile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeFileRepository = new FakeFileRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createFileService = new CreateFileService(
      fakeFileRepository,
      fakeStorageProvider,
    );

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    updateUserFileService = new UpdateUserFileService(fakeUserRepository);
  });

  it('should be able to update avatar file from user', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    const user = await createUserService.execute({
      files_id: '1',
      username: 'rszaneti',
      name: 'Rodrigo Zaneti',
      email: 'rodrigo@eadconcept.com.br',
      password: '12345',
    });

    await updateUserFileService.execute({
      users_id: user.id,
      files_id: file.id,
    });

    expect(user.files_id).toBe(file.id);
  });

  it('should not be able to update avatar file with a user not existing', async () => {
    await expect(
      updateUserFileService.execute({
        users_id: '',
        files_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
