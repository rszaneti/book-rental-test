import { container } from 'tsyringe';

import IFileRepository from '@modules/parameters/files/repositories/IFileRepository';
import FileRepository from '@modules/parameters/files/infra/typeorm/repositories/FileRepository';

container.registerSingleton<IFileRepository>('FileRepository', FileRepository);
