import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

import AppError from '@shared/errors/AppError';

interface IRequest {
  books_id: string;
}

@injectable()
class ShowBookService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
  ) {}

  public async execute({ books_id }: IRequest): Promise<Book> {
    const findReg = await this.bookRepository.findById(books_id);

    if (!findReg) {
      throw new AppError('Livro não localizado.');
    }

    return findReg;
  }
}

export default ShowBookService;
