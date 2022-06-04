import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ListBookRentalsService from '@modules/book_rentals/services/ListBookRentalsService';
import ListTotalBookRentalsService from '@modules/book_rentals/services/ListTotalBookRentalsService';
import ShowBookRentalService from '@modules/book_rentals/services/ShowBookRentalService';
import CreateBookRentalService from '@modules/book_rentals/services/CreateBookRentalService';

type IRequestSearch = {
  search_customers: string;
  search_books: string;
  search_withdrawal_date_start: string;
  search_withdrawal_date_end: string;
  search_return_date_start: string;
  search_return_date_end: string;
  select_only_withdrawn_books: 'yes' | 'no';
  select_only_returned_books: 'yes' | 'no';
  sort_field: 'title' | 'name' | 'withdrawal_date' | 'return_date';
  sort_order: 'ASC' | 'DESC';
  page: string;
  rowsperpage: string;
};

export default class BookRentalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      search_customers,
      search_books,
      search_withdrawal_date_start,
      search_withdrawal_date_end,
      search_return_date_start,
      search_return_date_end,
      select_only_withdrawn_books,
      select_only_returned_books,
      sort_field = 'withdrawal_date',
      sort_order = 'DESC',
      page = 1,
      rowsperpage = 15,
    } = request.query as IRequestSearch;

    const listSales = container.resolve(ListBookRentalsService);
    const listTotalSales = container.resolve(ListTotalBookRentalsService);

    const list = await listSales.execute({
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
      page: Number(page),
      rowsperpage: Number(rowsperpage),
    });

    const totalReg = await listTotalSales.execute({
      search_customers,
      search_books,
      search_withdrawal_date_start,
      search_withdrawal_date_end,
      search_return_date_start,
      search_return_date_end,
      select_only_withdrawn_books,
      select_only_returned_books,
    });

    return response.json({
      bookrentals: classToClass(list),
      bookrentalstotal: totalReg,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReg = container.resolve(ShowBookRentalService);

    const reg = await showReg.execute({
      book_rentals_id: id,
    });

    return response.json({ bookrental: classToClass(reg) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customers_id, books_id, lease_value } = request.body;

    const createReg = container.resolve(CreateBookRentalService);

    const reg = await createReg.execute({
      customers_id,
      books_id,
      lease_value,
    });

    return response.json({ bookrental: reg });
  }
}
