/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

// Repositories
import IBookRepository from '@modules/books/repositories/IBookRepository';

// DTOs
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import IFindBookDTO from '@modules/books/dtos/IFindBookDTO';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

class FakeBookRepository implements IBookRepository {
  private books: Book[] = [];

  public async findAllBooks({
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
  }: IFindBookDTO): Promise<Book[] | undefined> {
    const { books } = this;

    return books;
  }

  public async findTotalAllBooks({
    search_title,
    search_author,
    search_year_edition,
    search_number_edition,
    search_year,
    search_language,
    search_country,
    search_status,
  }: IFindBookDTO): Promise<number> {
    const { books } = this;

    return books.length;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const findReg = this.books.find(r => r.id === id);

    return findReg;
  }

  public async findByTitle(title: string): Promise<Book | undefined> {
    const findReg = this.books.find(r => r.title === title);

    return findReg;
  }

  public async create({
    files_id,
    title,
    description,
    author,
    year_edition,
    number_edition,
    year,
    language,
    country,
    pages,
    weight,
    lease_value,
    status,
  }: ICreateBookDTO): Promise<Book> {
    const createReg = new Book();

    Object.assign(createReg, {
      id: uuidv4(),
      files_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    });

    this.books.push(createReg);

    return createReg;
  }

  public async updateFile(books_id: string, files_id: string): Promise<void> {
    const findRegs = this.books.filter(r => r.id === books_id);

    if (findRegs) {
      const data = findRegs.map(p => {
        return { ...p, files_id };
      });

      const findIndex = this.books.findIndex(r => r.id === data[0].id);

      this.books[findIndex].files_id = data[0].files_id;
    }
  }

  public async save(saveReg: Book): Promise<Book> {
    const findIndex = this.books.findIndex(r => r.id === saveReg.id);

    this.books[findIndex] = saveReg;

    return saveReg;
  }

  public async delete(id: string): Promise<void> {
    const filterReg = this.books.filter(r => r.id !== id);

    this.books = filterReg;
  }
}

export default FakeBookRepository;
