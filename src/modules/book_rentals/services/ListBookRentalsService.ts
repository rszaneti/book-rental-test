import { inject, injectable } from 'tsyringe';

// Repository
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import BookRental from '@modules/book_rentals/infra/typeorm/entities/BookRental';

interface IRequest {
  search_customers?: string;
  search_books?: string;
  search_withdrawal_date_start?: string;
  search_withdrawal_date_end?: string;
  search_return_date_start?: string;
  search_return_date_end?: string;
  select_only_withdrawn_books?: 'yes' | 'no';
  select_only_returned_books?: 'yes' | 'no';
  sort_field: 'title' | 'name' | 'withdrawal_date' | 'return_date';
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

@injectable()
class ListBookRentalsService {
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
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IRequest): Promise<BookRental[] | undefined> {
    const list = await this.bookRentalRepository.findAllBookRentals({
      search_customers,
      search_books,
      search_withdrawal_date_start,
      search_withdrawal_date_end,
      search_return_date_start,
      search_return_date_end,
      select_only_withdrawn_books,
      select_only_returned_books,
      sort_field,
      sort_order,
      page,
      rowsperpage,
    });

    return list;
  }
}

export default ListBookRentalsService;
