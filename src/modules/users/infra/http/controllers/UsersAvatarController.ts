import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import UpdateUserFileService from '@modules/users/services/UpdateUserFileService';
import CreateFileService from '@modules/parameters/files/services/CreateFileService';

type IRequest = {
  filesid: string;
};

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename, originalname, mimetype, size } = request.file;
    const query = request.query as IRequest;

    // Operação para atualizar a tabela de arquivos
    const createFileUpload = container.resolve(CreateFileService);

    const file_upload = await createFileUpload.execute({
      files_id: query.filesid ? query.filesid : '',
      name: originalname,
      size,
      file_key: filename,
      mimetype,
    });

    // atualiza avatar na tabela do usuário
    const updateUserFile = container.resolve(UpdateUserFileService);

    const user = await updateUserFile.execute({
      files_id: file_upload.id,
      users_id: request.user.id,
    });

    return response.json({ user: classToClass(user) });
  }
}
