import { inject, injectable } from 'tsyringe';

// Repositories
import IFileRepository from '@modules/parameters/files/repositories/IFileRepository';

// Providers
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
}

@injectable()
class DeleteProductToCategoryService {
  constructor(
    @inject('FileRepository')
    private fileRepository: IFileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ files_id }: IRequest): Promise<void> {
    try {
      const file = await this.fileRepository.findById(files_id);

      if (file) {
        await this.storageProvider.deleteFile(file.file_key);
        await this.fileRepository.delete(file.id);
      }
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
}

export default DeleteProductToCategoryService;
