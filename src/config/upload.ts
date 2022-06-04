import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 'azure' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    azure: {
      containerName: string;
      containerAccessLevel: 'blob' | 'container' | 'private' | undefined;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    azure: {
      containerName: 'testeazure',
      containerAccessLevel: 'blob',
    },
  },
} as IUploadConfig;
