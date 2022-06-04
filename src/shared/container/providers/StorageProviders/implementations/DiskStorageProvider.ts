import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file_key: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file_key),
      path.resolve(uploadConfig.uploadsFolder, file_key),
    );

    return file_key;
  }

  public async deleteFile(file_key: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file_key);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
