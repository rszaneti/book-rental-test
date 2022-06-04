import { inject, injectable } from 'tsyringe';

// Repository
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

interface IRequest {
  search_customers?: string;
  search_books?: string;
  search_withdrawal_date_start?: string;
  search_withdrawal_date_end?: string;
  search_return_date_start?: string;
  search_return_date_end?: string;
  select_only_withdrawn_books?: 'yes' | 'no';
  select_only_returned_books?: 'yes' | 'no';
}

@injectable()
class ListTotalBookRentalsService {
  constructor(
    @inject('BookRentalRepository')
    private bookRentalRepository: IBookRentalRepository,
  ) {}

  public async execute({
    search_customers,
    search_books,
    search_withdrawal_date_start,
    search_withdrawal_date_end,
    search_return_date_start,
    search_return_date_end,
    select_only_withdrawn_books,
    select_only_returned_books,
  }: IRequest): Promise<number> {
    const totalReg = await this.bookRentalRepository.findTotalAllBookRentals({
      search_customers,
      search_books,
      search_withdrawal_date_start,
      search_withdrawal_date_end,
      search_return_date_start,
      search_return_date_end,
      select_only_withdrawn_books,
      select_only_returned_books,
    });

    return totalReg;
  }
}

export default ListTotalBookRentalsService;
