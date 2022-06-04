/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

// Repositories
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// DTOs
import ICreateBookRentalDTO from '@modules/book_rentals/dtos/ICreateBookRentalDTO';
import IFindBookRentalDTO from '@modules/book_rentals/dtos/IFindBookRentalDTO';

// Entities
import BookRental from '@modules/book_rentals/infra/typeorm/entities/BookRental';

class FakeBookRentalRepository implements IBookRentalRepository {
  private book_rentals: BookRental[] = [];

  public async findAllBookRentals({
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
  }: IFindBookRentalDTO): Promise<BookRental[] | undefined> {
    const { book_rentals } = this;

    return book_rentals;
  }

  public async findTotalAllBookRentals({
    search_customers,
    search_books,
    search_withdrawal_date_start,
    search_withdrawal_date_end,
    search_return_date_start,
    search_return_date_end,
    select_only_withdrawn_books,
    select_only_returned_books,
  }: IFindBookRentalDTO): Promise<number> {
    const { book_rentals } = this;

    return book_rentals.length;
  }

  public async findById(id: string): Promise<BookRental | undefined> {
    const findReg = this.book_rentals.find(r => r.id === id);

    return findReg;
  }

  public async findByRentedBook(books_id: string): Promise<number> {
    const findReg = this.book_rentals.filter(r => r.books_id === books_id);

    return findReg.length;
  }

  public async create({
    customers_id,
    books_id,
    withdrawal_date,
    expected_return_date,
    lease_value,
    total,
  }: ICreateBookRentalDTO): Promise<BookRental> {
    const createReg = new BookRental();

    Object.assign(createReg, {
      id: uuidv4(),
      customers_id,
      books_id,
      withdrawal_date,
      expected_return_date,
      lease_value,
      total,
    });

    this.book_rentals.push(createReg);

    return createReg;
  }

  public async save(saveReg: BookRental): Promise<BookRental> {
    const findIndex = this.book_rentals.findIndex(r => r.id === saveReg.id);

    this.book_rentals[findIndex] = saveReg;

    return saveReg;
  }
}

export default FakeBookRentalRepository;
