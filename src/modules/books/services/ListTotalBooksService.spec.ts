import FakeBookRepository from '../repositories/fakes/FakeBookRepository';
import ListTotalBooksService from './ListTotalBooksService';

let fakeBookRepository: FakeBookRepository;

let listTotalBooksService: ListTotalBooksService;

describe('ListTotalBooks', () => {
  beforeEach(() => {
    fakeBookRepository = new FakeBookRepository();

    listTotalBooksService = new ListTotalBooksService(fakeBookRepository);
  });

  it('should be able to count total the books', async () => {
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

    const createRegsUnion = [];

    createRegsUnion.push(createReg1);
    createRegsUnion.push(createReg2);

    const countReg = await listTotalBooksService.execute({
      search_title: '',
      search_author: '',
      search_year_edition: 0,
      search_number_edition: 0,
      search_year: 0,
      search_language: '',
      search_country: '',
      search_status: 'HABILITADO',
    });

    expect(countReg).toBe(createRegsUnion.length);
  });
});
