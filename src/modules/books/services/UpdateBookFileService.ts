import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

import AppError from '@shared/errors/AppError';

interface IRequest {
  books_id: string;
  files_id: string;
}

@injectable()
class UpdateBookFileService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,

    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({ books_id, files_id }: IRequest): Promise<Book> {
    const countRegs = await this.bookRentalRepository.findByRentedBook(
      books_id,
    );
    if (countRegs) {
      throw new AppError(
        'Não é permitido editar a imagem de um livro alugado.',
      );
    }

    try {
      await this.bookRepository.updateFile(books_id, files_id);
    } catch (err) {
      throw new AppError(`Houve uma falha ao gravar a imagem.`);
    }

    const findReg = await this.bookRepository.findById(books_id);

    if (!findReg) {
      throw new AppError('Livro não localizada.');
    }

    return findReg;
  }
}

export default UpdateBookFileService;
