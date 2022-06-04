import AppError from '@shared/errors/AppError';
import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import ShowBookService from './ShowBookService';

let fakeBookRepository: FakeBookRepository;

let showBookService: ShowBookService;

describe('ShowBook', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();

    showBookService = new ShowBookService(fakeBookRepository);
  });

  it('should be able to show the book', async () => {
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

    const showReg = await showBookService.execute({
      books_id: createReg.id,
    });

    expect(showReg.title).toBe('O Senhor dos Anéis');
    expect(showReg.author).toBe('J. R. R. Tolkien');
  });
});

it('should not be able show to non-existing book', async () => {
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
    showBookService.execute({
      books_id: '12',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
