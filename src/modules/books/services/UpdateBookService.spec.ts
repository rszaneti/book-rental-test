import AppError from '@shared/errors/AppError';

import FakeBookRentalRepository from '@modules/book_rentals/repositories/fakes/FakeBookRentalRepository';
import CreateBookRentalService from '@modules/book_rentals/services/CreateBookRentalService';

import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import UpdateBookService from './UpdateBookService';

let fakeBookRepository: FakeBookRepository;
let fakeBookRentalRepository: FakeBookRentalRepository;

let updateBookService: UpdateBookService;
let createBookRentalService: CreateBookRentalService;

describe('UpdateBook', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    fakeBookRentalRepository = new FakeBookRentalRepository();

    updateBookService = new UpdateBookService(
      fakeBookRepository,
      fakeBookRentalRepository,
    );

    createBookRentalService = new CreateBookRentalService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to update the book', async () => {
    const createReg = await fakeBookRepository.create({
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

    const updateReg = await updateBookService.execute({
      books_id: createReg.id,
      title: 'O Senhor dos Anéis 2',
      description: 'A saga',
      author: 'J. R. R. Tolkien',
      year_edition: 1960,
      number_edition: 1,
      year: 1959,
      language: 'Inglês',
      country: 'Inglaterra',
      pages: 1000,
      weight: 200,
      lease_value: 50,
      status: true,
    });

    expect(updateReg.title).toBe('O Senhor dos Anéis 2');
    expect(updateReg.year_edition).toBe(1960);
    expect(updateReg.year).toBe(1959);
  });

  it('should not be able change to non-existing book', async () => {
    await fakeBookRepository.create({
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

    await expect(
      updateBookService.execute({
        books_id: '1',
        title: 'O Senhor dos Anéis 2',
        description: 'A saga',
        author: 'J. R. R. Tolkien',
        year_edition: 1960,
        number_edition: 1,
        year: 1959,
        language: 'Inglês',
        country: 'Inglaterra',
        pages: 1000,
        weight: 200,
        lease_value: 50,
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change to another book title', async () => {
    await fakeBookRepository.create({
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

    const createReg = await fakeBookRepository.create({
      files_id: '1',
      title: 'O Senhor dos Anéis 2',
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

    await expect(
      updateBookService.execute({
        books_id: createReg.id,
        title: 'O Senhor dos Anéis',
        description: 'A saga',
        author: 'J. R. R. Tolkien',
        year_edition: 1960,
        number_edition: 1,
        year: 1959,
        language: 'Inglês',
        country: 'Inglaterra',
        pages: 1000,
        weight: 200,
        lease_value: 50,
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able edit a book already rented', async () => {
    const createReg = await fakeBookRepository.create({
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
      updateBookService.execute({
        books_id: createReg.id,
        title: 'O Senhor dos Anéis 2',
        description: 'A saga',
        author: 'J. R. R. Tolkien',
        year_edition: 1960,
        number_edition: 1,
        year: 1959,
        language: 'Inglês',
        country: 'Inglaterra',
        pages: 1000,
        weight: 200,
        lease_value: 50,
        status: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
