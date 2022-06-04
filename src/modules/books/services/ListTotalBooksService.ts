import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';

interface IRequest {
  search_title?: string;
  search_author?: string;
  search_year_edition?: number;
  search_number_edition?: number;
  search_year?: number;
  search_language?: string;
  search_country?: string;
  search_status?: string;
}

@injectable()
class ListTotalBooksService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
  ) {}

  public async execute({
    search_title,
    search_author,
    search_year_edition,
    search_number_edition,
    search_year,
    search_language,
    search_country,
    search_status,
  }: IRequest): Promise<number> {
    const countRegs = await this.bookRepository.findTotalAllBooks({
      search_title,
      search_author,
      search_year_edition,
      search_number_edition,
      search_year,
      search_language,
      search_country,
      search_status,
    });

    return countRegs;
  }
}

export default ListTotalBooksService;
