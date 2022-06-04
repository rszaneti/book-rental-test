import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeFileRepository from '../repositories/fakes/FakeFileRepository';

import DeleteFileService from './DeleteFileService';

let fakeFileRepository: FakeFileRepository;
let fakeStorageProvider: FakeStorageProvider;

let deleteFileService: DeleteFileService;

describe('DeleteFile', () => {
  beforeEach(() => {
    fakeFileRepository = new FakeFileRepository();
    fakeStorageProvider = new FakeStorageProvider();

    deleteFileService = new DeleteFileService(
      fakeFileRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete the file', async () => {
    const file1 = await fakeFileRepository.create({
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    const filesUnion = [];

    filesUnion.push(file1);

    const file2 = await fakeFileRepository.create({
      name: 'file1.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    await deleteFileService.execute({
      files_id: file2.id,
    });

    const files = await fakeFileRepository.findByFileKey(
      '4534kj435jk-file.png',
    );

    expect(JSON.stringify(filesUnion)).toBe(JSON.stringify([files]));
  });
});
