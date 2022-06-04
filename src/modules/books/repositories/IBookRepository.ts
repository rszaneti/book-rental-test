import Book from '../infra/typeorm/entities/Book';

import ICreateBookDTO from '../dtos/ICreateBookDTO';
import IFindBookDTO from '../dtos/IFindBookDTO';

export default interface IBookRepository {
  findAllBooks({
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
  }: IFindBookDTO): Promise<Book[] | undefined>;
  findTotalAllBooks({
    search_title,
    search_author,
    search_year_edition,
    search_number_edition,
    search_year,
    search_language,
    search_country,
    search_status,
  }: IFindBookDTO): Promise<number>;
  findById(id: string): Promise<Book | undefined>;
  findByTitle(title: string): Promise<Book | undefined>;
  create(data: ICreateBookDTO): Promise<Book>;
  updateFile(books_id: string, files_id: string): Promise<void>;
  save(data: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}
