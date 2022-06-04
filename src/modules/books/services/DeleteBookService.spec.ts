import AppError from '@shared/errors/AppError';

import FakeBookRentalRepository from '@modules/book_rentals/repositories/fakes/FakeBookRentalRepository';
import CreateBookRentalService from '@modules/book_rentals/services/CreateBookRentalService';

import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import DeleteBookService from './DeleteBookService';

let fakeBookRepository: FakeBookRepository;
let fakeBookRentalRepository: FakeBookRentalRepository;

let deleteBookService: DeleteBookService;
let createBookRentalService: CreateBookRentalService;

describe('DeleteBook', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();
    fakeBookRentalRepository = new FakeBookRentalRepository();

    deleteBookService = new DeleteBookService(
      fakeBookRepository,
      fakeBookRentalRepository,
    );

    createBookRentalService = new CreateBookRentalService(
      fakeBookRentalRepository,
    );
  });

  it('should be able to delete the book', async () => {
    const createReg1 = await fakeBookRepository.create({
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

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);

    const createReg2 = await fakeBookRepository.create({
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

    await deleteBookService.execute({
      books_id: createReg2.id,
    });

    const list = await fakeBookRepository.findAllBooks({
      search_title: '',
      search_author: '',
      search_year_edition: 0,
      search_number_edition: 0,
      search_year: 0,
      search_language: '',
      search_country: '',
      search_status: 'HABILITADO',
      sort_field: '',
      sort_order: '',
      page: 1,
      rowsperpage: 15,
    });

    expect(JSON.stringify(createRegsUnion)).toBe(JSON.stringify(list));
  });

  it('should not be able delete a book already rented', async () => {
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
      deleteBookService.execute({
        books_id: createReg.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
