import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  books_id: string;
}

@injectable()
class DeleteBookService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,

    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({ books_id }: IRequest): Promise<void> {
    try {
      const countRegs = await this.bookRentalRepository.findByRentedBook(
        books_id,
      );

      if (countRegs) {
        throw new AppError('Não é permitido deletar um livro alugado.');
      }

      await this.bookRepository.delete(books_id);
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
}

export default DeleteBookService;
