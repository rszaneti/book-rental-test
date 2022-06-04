import { inject, injectable } from 'tsyringe';

// Repositories
import IFileRepository from '@modules/parameters/files/repositories/IFileRepository';

// Entities
import File from '@modules/parameters/files/infra/typeorm/entities/File';

// Providers
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
  name: string;
  size: number;
  file_key: string;
  mimetype: string;
}

@injectable()
class CreateFileService {
  constructor(
    @inject('FileRepository')
    private fileRepository: IFileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    files_id,
    name,
    size,
    file_key,
    mimetype,
  }: IRequest): Promise<File> {
    if (files_id) {
      const file = await this.fileRepository.findById(files_id);

      if (file) {
        await this.storageProvider.deleteFile(file.file_key);
        await this.fileRepository.delete(file.id);
      }

      const checkFileKeyExist = await this.fileRepository.findByFileKey(
        file_key,
      );

      if (checkFileKeyExist) {
        throw new AppError('Nome do arquivo já cadastrado.');
      }
    }

    const filekey = await this.storageProvider.saveFile(file_key, mimetype);

    const fileCreate = this.fileRepository.create({
      name,
      size,
      file_key: filekey,
      mimetype,
    });

    return fileCreate;
  }
}

export default CreateFileService;
