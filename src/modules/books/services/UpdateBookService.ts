import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

import AppError from '@shared/errors/AppError';

interface IRequest {
  books_id: string;
  title: string;
  description: string;
  author: string;
  year_edition: number;
  number_edition: number;
  year: number;
  language: string;
  country: string;
  pages: number;
  weight: number;
  lease_value: number;
  status: boolean;
}

@injectable()
class UpdateBookService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,

    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({
    books_id,
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
  }: IRequest): Promise<Book> {
    const findReg = await this.bookRepository.findById(books_id);

    if (!findReg) {
      throw new AppError('Livro não localizado.');
    }

    const countRegs = await this.bookRentalRepository.findByRentedBook(
      books_id,
    );

    if (countRegs) {
      throw new AppError('Não é permitido editar um livro alugado.');
    }

    const checkTitleExist = await this.bookRepository.findByTitle(title);
    if (checkTitleExist && checkTitleExist.id !== books_id) {
      throw new AppError('Título do livro já cadastrado.');
    }

    findReg.title = title;
    findReg.description = description;
    findReg.author = author;
    findReg.year_edition = year_edition;
    findReg.number_edition = number_edition;
    findReg.year = year;
    findReg.language = language;
    findReg.country = country;
    findReg.pages = pages;
    findReg.weight = weight;
    findReg.lease_value = lease_value;
    findReg.status = status;

    const updateReg = this.bookRepository.save(findReg);

    return updateReg;
  }
}

export default UpdateBookService;
