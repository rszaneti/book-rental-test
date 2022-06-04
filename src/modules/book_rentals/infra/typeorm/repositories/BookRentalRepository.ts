import { getRepository, Repository } from 'typeorm';

// DTOs
import ICreateBookRentalDTO from '@modules/book_rentals/dtos/ICreateBookRentalDTO';

// Repositories
import IBookRentalRepository from '@modules/book_rentals/repositories/IBookRentalRepository';

// Entities
import BookRental from '../entities/BookRental';

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

class BookRentalRepository implements IBookRentalRepository {
  private ormRepository: Repository<BookRental>;

  constructor() {
    this.ormRepository = getRepository(BookRental);
  }

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
  }: IRequest): Promise<BookRental[] | undefined> {
    // Período data de retirada
    let withdrawal_date = '';

    if (search_withdrawal_date_start && search_withdrawal_date_end) {
      withdrawal_date = `cast(br.withdrawal_date AS DATE) >= cast('${search_withdrawal_date_start}' AS DATE) AND cast(br.withdrawal_date AS DATE) <= cast('${search_withdrawal_date_end}' AS DATE)`;
    } else {
      withdrawal_date = '1=1';
    }

    // Período data de retorno
    let return_date = '';

    if (search_return_date_start && search_return_date_end) {
      return_date = `cast(br.return_date AS DATE) >= cast('${search_return_date_start}' AS DATE) AND cast(br.return_date AS DATE) <= cast('${search_return_date_end}' AS DATE)`;
    } else {
      return_date = '1=1';
    }

    // Ordenação de campos
    let sort_field_data = '';
    if (sort_field === 'name') {
      sort_field_data = 'c.name';
    } else if (sort_field === 'title') {
      sort_field_data = 'b.title';
    } else {
      sort_field_data = `br.${sort_field}`;
    }

    const list = await this.ormRepository
      .createQueryBuilder('br')
      .leftJoinAndSelect('br.customer', 'c')
      .leftJoinAndSelect('br.book', 'b')
      .where(
        search_customers
          ? 'LOWER(c.name) like LOWER(:search_customers)'
          : '1=1',
        {
          search_customers: `%${search_customers}%`,
        },
      )
      .andWhere(
        search_books ? 'LOWER(b.title) like LOWER(:search_books)' : '1=1',
        {
          search_books: `%${search_books}%`,
        },
      )
      .andWhere(withdrawal_date)
      .andWhere(return_date)
      .andWhere(
        select_only_withdrawn_books === 'yes'
          ? 'NOT br.withdrawal_date IS NULL AND br.return_date IS NULL'
          : '1=1',
      )
      .andWhere(
        select_only_returned_books === 'yes'
          ? 'NOT br.return_date IS NULL'
          : '1=1',
      )
      .orderBy(sort_field_data, sort_order, 'NULLS FIRST')
      .take(rowsperpage)
      .skip((page - 1) * rowsperpage)
      .getMany();

    return list;
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
  }: IRequest): Promise<number> {
    // Período data de retirada
    let withdrawal_date = '';

    if (search_withdrawal_date_start && search_withdrawal_date_end) {
      withdrawal_date = `cast(br.withdrawal_date AS DATE) >= cast('${search_withdrawal_date_start}' AS DATE) AND cast(br.withdrawal_date AS DATE) <= cast('${search_withdrawal_date_end}' AS DATE)`;
    } else {
      withdrawal_date = '1=1';
    }

    // Período data de retorno
    let return_date = '';

    if (search_return_date_start && search_return_date_end) {
      return_date = `cast(br.return_date AS DATE) >= cast('${search_return_date_start}' AS DATE) AND cast(br.return_date AS DATE) <= cast('${search_return_date_end}' AS DATE)`;
    } else {
      return_date = '1=1';
    }

    const countReg = await this.ormRepository
      .createQueryBuilder('br')
      .leftJoinAndSelect('br.customer', 'c')
      .leftJoinAndSelect('br.book', 'b')
      .where(
        search_customers
          ? 'LOWER(c.name) like LOWER(:search_customers)'
          : '1=1',
        {
          search_customers: `%${search_customers}%`,
        },
      )
      .andWhere(
        search_books ? 'LOWER(b.title) like LOWER(:search_books)' : '1=1',
        {
          search_books: `%${search_books}%`,
        },
      )
      .andWhere(withdrawal_date)
      .andWhere(return_date)
      .andWhere(
        select_only_withdrawn_books === 'yes'
          ? 'NOT br.withdrawal_date IS NULL AND br.return_date IS NULL'
          : '1=1',
      )
      .andWhere(
        select_only_returned_books === 'yes'
          ? 'NOT br.return_date IS NULL'
          : '1=1',
      )
      .getCount();

    return countReg;
  }

  public async findById(id: string): Promise<BookRental | undefined> {
    const findReg = await this.ormRepository.findOne({
      where: { id },
    });

    return findReg;
  }

  public async findByRentedBook(books_id: string): Promise<number> {
    const countReg = await this.ormRepository
      .createQueryBuilder('br')
      .where('br.books_id = :books_id', {
        books_id,
      })
      .andWhere('br.return_date IS NULL')
      .getCount();

    return countReg;
  }

  public async create({
    customers_id,
    books_id,
    withdrawal_date,
    expected_return_date,
    lease_value,
    total,
  }: ICreateBookRentalDTO): Promise<BookRental> {
    const createReg = this.ormRepository.create({
      customers_id,
      books_id,
      withdrawal_date,
      expected_return_date,
      lease_value,
      total,
    });

    const reg = await this.ormRepository.save(createReg);

    return reg;
  }

  public async save(saveReg: BookRental): Promise<BookRental> {
    return this.ormRepository.save(saveReg);
  }
}

export default BookRentalRepository;
