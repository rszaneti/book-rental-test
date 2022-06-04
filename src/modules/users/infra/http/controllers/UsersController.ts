import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import ListUsersService from '@modules/users/services/ListUsersService';
import ListTotalUsersService from '@modules/users/services/ListTotalUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

type IRequestSearch = {
  search_username: string;
  search_name: string;
  sort_field: string;
  sort_order: string;
  page: string;
  rowsperpage: string;
};

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      search_username,
      search_name,
      sort_field,
      sort_order = 'ASC',
      page = 1,
      rowsperpage = 15,
    } = request.query as IRequestSearch;

    const list = container.resolve(ListUsersService);
    const listTotal = container.resolve(ListTotalUsersService);

    const regs = await list.execute({
      search_username,
      search_name,
      sort_field,
      sort_order,
      page: Number(page),
      rowsperpage: Number(rowsperpage),
    });

    const totalRegs = await listTotal.execute({
      search_username,
      search_name,
    });

    return response.json({ users: classToClass(regs), userstotal: totalRegs });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const users_id = request.user.id;

    const showReg = container.resolve(ShowUserService);

    const reg = await showReg.execute({
      users_id,
    });

    return response.json({ user: classToClass(reg) });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { files_id, username, name, email, password } = request.body;

    const createReg = container.resolve(CreateUserService);

    const reg = await createReg.execute({
      files_id,
      username,
      name,
      email,
      password,
    });

    const userSend = {
      id: reg.id,
    };

    return response.json(userSend);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { users_id, username, name, email } = request.body;

    const updateReg = container.resolve(UpdateUserService);

    const reg = await updateReg.execute({
      users_id,
      username,
      name,
      email,
    });

    const userSend = {
      id: reg.id,
    };

    return response.json(userSend);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({
      users_id: id,
    });

    return response.status(204).json();
  }
}
