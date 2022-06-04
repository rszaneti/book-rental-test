import BookRental from '../infra/typeorm/entities/BookRental';

import ICreateBookRentalDTO from '../dtos/ICreateBookRentalDTO';
import IFindBookRentalDTO from '../dtos/IFindBookRentalDTO';

export default interface ISaleRepository {
  findAllBookRentals({
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
  }: IFindBookRentalDTO): Promise<BookRental[] | undefined>;
  findTotalAllBookRentals({
    search_customers,
    search_books,
    search_withdrawal_date_start,
    search_withdrawal_date_end,
    search_return_date_start,
    search_return_date_end,
    select_only_withdrawn_books,
    select_only_returned_books,
  }: IFindBookRentalDTO): Promise<number>;
  findById(id: string): Promise<BookRental | undefined>;
  findByRentedBook(books_id: string): Promise<number>;
  create(data: ICreateBookRentalDTO): Promise<BookRental>;
  save(data: BookRental): Promise<BookRental>;
}
