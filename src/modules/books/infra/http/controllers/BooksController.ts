import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ListBooksService from '@modules/books/services/ListBooksService';
import ListTotalBooksService from '@modules/books/services/ListTotalBooksService';
import ShowBookService from '@modules/books/services/ShowBookService';
import CreateBookService from '@modules/books/services/CreateBookService';
import UpdateBookService from '@modules/books/services/UpdateBookService';
import DeleteBookService from '@modules/books/services/DeleteBookService';

type IRequestSearch = {
  search_title: string;
  search_author: string;
  search_year_edition: string;
  search_number_edition: string;
  search_year: string;
  search_language: string;
  search_country: string;
  search_status: 'habilitado' | 'desabilitado' | '';
  sort_field:
    | 'title'
    | 'author'
    | 'year_edition'
    | 'number_edition'
    | 'year'
    | 'language'
    | 'country'
    | 'status';
  sort_order: 'ASC' | 'DESC';
  page: string;
  rowsperpage: string;
};

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      search_title,
      search_author,
      search_year_edition,
      search_number_edition,
      search_year,
      search_language,
      search_country,
      search_status,
      sort_field = 'title',
      sort_order = 'ASC',
      page = '1',
      rowsperpage = '15',
    } = request.query as IRequestSearch;

    const list = container.resolve(ListBooksService);
    const listTotal = container.resolve(ListTotalBooksService);

    const regs = await list.execute({
      search_title,
      search_author,
      search_year_edition: Number(search_year_edition),
      search_number_edition: Number(search_number_edition),
      search_year: Number(search_year),
      search_language,
      search_country,
      search_status,
      sort_field,
      sort_order,
      page: Number(page),
      rowsperpage: Number(rowsperpage),
    });

    const totalRegs = await listTotal.execute({
      search_title,
      search_author,
      search_year_edition: Number(search_year_edition),
      search_number_edition: Number(search_number_edition),
      search_year: Number(search_year),
      search_language,
      search_country,
      search_status,
    });

    return response.json({
      books: classToClass(regs),
      bookstotal: totalRegs,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReg = container.resolve(ShowBookService);

    const reg = await showReg.execute({
      books_id: id,
    });

    return response.json({ book: classToClass(reg) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      files_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    } = request.body;

    const createReg = container.resolve(CreateBookService);

    const reg = await createReg.execute({
      files_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    });

    return response.json({ book: classToClass(reg) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      books_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    } = request.body;

    const updateReg = container.resolve(UpdateBookService);

    const reg = await updateReg.execute({
      books_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    });

    return response.json({ rentalproduct: classToClass(reg) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRegs = container.resolve(DeleteBookService);

    await deleteRegs.execute({
      books_id: id,
    });

    return response.status(204).json();
  }
}
