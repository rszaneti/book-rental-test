import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeFileRepository from '@modules/parameters/files/repositories/fakes/FakeFileRepository';
import CreateFileService from '@modules/parameters/files/services/CreateFileService';

import FakeBookRentalRepository from '@modules/book_rentals/repositories/fakes/FakeBookRentalRepository';
import CreateBookRentalService from '@modules/book_rentals/services/CreateBookRentalService';

import FakeBookRepository from '../repositories/fakes/FakeBookRepository';

import CreateBookService from './CreateBookService';
import UpdateBookFileService from './UpdateBookFileService';

let fakeBookRepository: FakeBookRepository;
let fakeFileRepository: FakeFileRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeBookRentalRepository: FakeBookRentalRepository;

let createFileService: CreateFileService;
let createBookService: CreateBookService;
let updateBookFileService: UpdateBookFileService;
let createBookRentalService: CreateBookRentalService;

describe('UpdateBookFile', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    fakeFileRepository = new FakeFileRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBookRentalRepository = new FakeBookRentalRepository();

    createFileService = new CreateFileService(
      fakeFileRepository,
      fakeStorageProvider,
    );

    createBookService = new CreateBookService(fakeBookRepository);
    createBookRentalService = new CreateBookRentalService(
      fakeBookRentalRepository,
    );
    updateBookFileService = new UpdateBookFileService(
      fakeBookRepository,
      fakeBookRentalRepository,
    );
  });

  it('should be able to update image file from book', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    const createReg = await createBookService.execute({
      files_id: '1',
      title: 'O Senhor dos Anéis',
      description: 'A saga',
      author: 'J. R. R. Tolkien',
      year_edition: 1954,
      number_edition: 1,
      year: 1954,
      language: 'Inglês',
      country: 'Inglaterra',
      pages: 1000,
      weight: 200,
      lease_value: 50,
      status: true,
    });

    await updateBookFileService.execute({
      books_id: createReg.id,
      files_id: file.id,
    });

    expect(createReg.files_id).toBe(file.id);
  });

  it('should not be able to update image file with a book not existing', async () => {
    expect(
      updateBookFileService.execute({
        books_id: '',
        files_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able edit a image of the book already rented', async () => {
    const file = await createFileService.execute({
      files_id: '',
      name: 'file.png',
      size: 344533,
      file_key: '4534kj435jk-file.png',
      mimetype: 'image',
    });

    const createReg = await createBookService.execute({
      files_id: '1',
      title: 'O Senhor dos Anéis',
      description: 'A saga',
      author: 'J. R. R. Tolkien',
      year_edition: 1954,
      number_edition: 1,
      year: 1954,
      language: 'Inglês',
      country: 'Inglaterra',
      pages: 1000,
      weight: 200,
      lease_value: 50,
      status: true,
    });

    await createBookRentalService.execute({
      customers_id: '1',
      books_id: createReg.id,
      lease_value: 10,
      total: 10,
    });

    await expect(
      updateBookFileService.execute({
        books_id: createReg.id,
        files_id: file.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
