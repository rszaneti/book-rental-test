import AppError from '@shared/errors/AppError';

import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import CreateBookService from './CreateBookService';

let fakeBookRepository: FakeBookRepository;

let createBookService: CreateBookService;

describe('CreateBook', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();

    createBookService = new CreateBookService(fakeBookRepository);
  });

  it('should be able to create a new book', async () => {
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

    expect(createReg).toHaveProperty('id');
  });

  it('should not be able to create a new book with the same title another', async () => {
    await createBookService.execute({
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
      createBookService.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
