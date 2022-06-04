import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import AuthenticateUsersService from '@modules/users/services/AuthenticateUsersService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUsers = container.resolve(AuthenticateUsersService);

    const { user, token } = await authenticateUsers.execute({
      username,
      password,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}
