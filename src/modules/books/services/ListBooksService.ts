import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

interface IRequest {
  search_title?: string;
  search_author?: string;
  search_year_edition?: number;
  search_number_edition?: number;
  search_year?: number;
  search_language?: string;
  search_country?: string;
  search_status?: 'habilitado' | 'desabilitado' | '';
  sort_field:
    | 'title'
    | 'author'
    | 'year_edition'
    | 'number_edition'
    | 'year'
    | 'language'
    | 'country'
    | 'status';
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

@injectable()
class ListBooksService {
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
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IRequest): Promise<Book[] | undefined> {
    const list = await this.bookRepository.findAllBooks({
      search_title,
      search_author,
      search_year_edition,
      search_number_edition,
      search_year,
      search_language,
      search_country,
      search_status,
      sort_field,
      sort_order,
      page,
      rowsperpage,
    });

    return list;
  }
}

export default ListBooksService;
