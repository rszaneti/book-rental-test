import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeFileRepository from '../repositories/fakes/FakeFileRepository';

import CreateFileService from './CreateFileService';

let fakeFileRepository: FakeFileRepository;
let fakeStorageProvider: FakeStorageProvider;

let createFileService: CreateFileService;

describe('CreateFile', () => {
  beforeEach(() => {
    fakeFileRepository = new FakeFileRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createFileService = new CreateFileService(
      fakeFileRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new file', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    expect(file).toHaveProperty('id');
  });

  it('should be able to create a new file by removing the previous id', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '51d4a16d390d8199000c-wireless__device__laptop__gadget-512.png',
      mimetype: 'image',
    });

    const newfile = await createFileService.execute({
      files_id: file.id,
      name: 'file1.png',
      size: 344533,
      file_key: '4534kj435jk-file1.png',
      mimetype: 'image',
    });

    expect(newfile).toHaveProperty('file_key');
  });

  it('should not be able to create a new file with the same file_key', async () => {
    await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '51d4a16d390d8199000c-wireless__device__laptop__gadget-512.png',
      mimetype: 'image',
    });

    expect(
      createFileService.execute({
        files_id: '',
        name: 'file.png',
        size: 344533,
        file_key:
          '51d4a16d390d8199000c-wireless__device__laptop__gadget-512.png',
        mimetype: 'image',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
