import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import ListTotalCustomersService from '@modules/customers/services/ListTotalCustomersService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

type IRequestSearch = {
  search_name: string;
  search_email: string;
  search_cellphone: string;
  sort_field: 'name' | 'email' | 'cellphone';
  sort_order: 'ASC' | 'DESC';
  page: string;
  rowsperpage: string;
};

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      search_name,
      search_email,
      search_cellphone,
      sort_field = 'name',
      sort_order = 'ASC',
      page = 1,
      rowsperpage = 15,
    } = request.query as IRequestSearch;

    const list = container.resolve(ListCustomersService);
    const listTotal = container.resolve(ListTotalCustomersService);

    const regs = await list.execute({
      search_name,
      search_email,
      search_cellphone,
      sort_field,
      sort_order,
      page: Number(page),
      rowsperpage: Number(rowsperpage),
    });

    const totalRegs = await listTotal.execute({
      search_name,
      search_email,
      search_cellphone,
    });

    return response.json({
      customers: classToClass(regs),
      customerstotal: totalRegs,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showReg = container.resolve(ShowCustomerService);

    const reg = await showReg.execute({
      customers_id: id,
    });

    return response.json({ customer: classToClass(reg) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { files_id, name, email, cellphone } = request.body;

    const createReg = container.resolve(CreateCustomerService);

    const reg = await createReg.execute({
      files_id,
      name,
      email,
      cellphone,
    });

    return response.json({ customer: classToClass(reg) });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { customers_id, name, email, cellphone } = request.body;

    const updateReg = container.resolve(UpdateCustomerService);

    const reg = await updateReg.execute({
      customers_id,
      name,
      email,
      cellphone,
    });

    return response.json({ customer: classToClass(reg) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteReg = container.resolve(DeleteCustomerService);

    await deleteReg.execute({
      customers_id: id,
    });

    return response.status(204).json();
  }
}
