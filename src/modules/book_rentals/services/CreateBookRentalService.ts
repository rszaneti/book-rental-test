import { addDays } from 'date-fns';
import { inject, injectable } from 'tsyringe';

// Repository
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import BookRental from '@modules/book_rentals/infra/typeorm/entities/BookRental';

import AppError from '@shared/errors/AppError';
import bookRentalSetting from '@config/bookRentalSetting';

interface IRequest {
  customers_id: string;
  books_id: string;
  lease_value: number;
}

@injectable()
class CreateBookRentalService {
  constructor(
    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({
    customers_id,
    books_id,
    lease_value,
  }: IRequest): Promise<BookRental> {
    const countRegs = await this.bookRentalRepository.findByRentedBook(
      books_id,
    );

    if (countRegs) {
      throw new AppError('Não é permitido alugar um livro já alugado.');
    }

    const createReg = this.bookRentalRepository.create({
      customers_id,
      books_id,
      withdrawal_date: new Date(),
      expected_return_date: addDays(new Date(), bookRentalSetting.rental_days),
      lease_value,
      total: lease_value,
    });

    return createReg;
  }
}

export default CreateBookRentalService;
