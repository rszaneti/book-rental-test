import { inject, injectable } from 'tsyringe';

// Repository
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import BookRental from '@modules/book_rentals/infra/typeorm/entities/BookRental';

import AppError from '@shared/errors/AppError';

interface IRequest {
  book_rentals_id: string;
}

@injectable()
class ShowBookRentalService {
  constructor(
    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({ book_rentals_id }: IRequest): Promise<BookRental> {
    const showReg = await this.bookRentalRepository.findById(book_rentals_id);

    if (!showReg) {
      throw new AppError('Aluguél do livro não localizado.');
    }

    return showReg;
  }
}

export default ShowBookRentalService;
