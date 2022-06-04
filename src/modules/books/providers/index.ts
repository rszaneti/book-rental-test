import { container } from 'tsyringe';

import IBookRepository from '../repositories/IBookRepository';
import BookRepository from '../infra/typeorm/repositories/BookRepository';

container.registerSingleton<IBookRepository>('BookRepository', BookRepository);
