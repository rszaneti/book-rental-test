import { inject, injectable } from 'tsyringe';
import { isAfter } from 'date-fns';

// Repository
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import BookRental from '@modules/book_rentals/infra/typeorm/entities/BookRental';

import AppError from '@shared/errors/AppError';
import bookRentalSetting from '@config/bookRentalSetting';

interface IRequest {
  book_rentals_id: string;
}

@injectable()
class ReturnBookRentalService {
  constructor(
    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({ book_rentals_id }: IRequest): Promise<BookRental> {
    const saveReg = await this.bookRentalRepository.findById(book_rentals_id);

    if (!saveReg) {
      throw new AppError('Aluguél deste livro não localizado.');
    }

    if (saveReg.return_date) {
      throw new AppError('Livro já devolvido.');
    }

    // Verifica atraso do retorno do livro
    let lateFee = 0;
    let totalRenta = saveReg.total;
    if (isAfter(Date.now(), saveReg.expected_return_date)) {
      lateFee = bookRentalSetting.late_fee_percentage;
      totalRenta +=
        (saveReg.lease_value * bookRentalSetting.late_fee_percentage) / 100;
    }

    saveReg.return_date = new Date();
    saveReg.late_fee = lateFee;
    saveReg.total = totalRenta;

    const updateReg = this.bookRentalRepository.save(saveReg);

    return updateReg;
  }
}

export default ReturnBookRentalService;
