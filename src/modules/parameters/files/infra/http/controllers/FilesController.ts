import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateFileService from '@modules/parameters/files/services/CreateFileService';
import DeleteFileService from '@modules/parameters/files/services/DeleteFileService';

export default class FilesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { filename, originalname, mimetype, size } = request.file;

    const createFileUpload = container.resolve(CreateFileService);

    const fileUpload = await createFileUpload.execute({
      files_id: '',
      name: originalname,
      size,
      file_key: filename,
      mimetype,
    });

    return response.json(fileUpload);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteFile = container.resolve(DeleteFileService);

    await deleteFile.execute({
      files_id: id as string,
    });

    return response.status(204).json();
  }
}
