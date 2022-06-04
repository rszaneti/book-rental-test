import fs from 'fs';
import path from 'path';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class AzureStorageProvider implements IStorageProvider {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    const account = process.env.AZURE_ACCOUNT_NAME || '';
    const accountKey = process.env.AZURE_ACCOUNT_KEY || '';

    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey,
    );

    this.blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
  }

  public async saveFile(file: string, mimetype: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const blobOptions = {
      blobHTTPHeaders: {
        blobContentType: mimetype,
      },
    };

    const { containerName } = uploadConfig.config.azure;

    const containerClient = this.blobServiceClient.getContainerClient(
      containerName,
    );

    const blockBlobClient = containerClient.getBlockBlobClient(file);
    await blockBlobClient.uploadFile(originalPath, blobOptions);

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const { containerName } = uploadConfig.config.azure;

    const containerClient = this.blobServiceClient.getContainerClient(
      containerName,
    );

    const blockBlobClient = containerClient.getBlockBlobClient(file);
    await blockBlobClient.delete();
  }
}

export default AzureStorageProvider;
