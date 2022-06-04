import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// Services
import UpdateCustomerFileService from '@modules/customers/services/UpdateCustomerFileService';
import CreateFileService from '@modules/parameters/files/services/CreateFileService';

type IRequest = {
  filesid: string;
};

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename, originalname, mimetype, size } = request.file;
    const query = request.query as IRequest;
    const { customers_id } = request.body;

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
    const updateRegFile = container.resolve(UpdateCustomerFileService);

    const reg = await updateRegFile.execute({
      files_id: file_upload.id,
      customers_id,
    });

    return response.json({ customer: classToClass(reg) });
  }
}
