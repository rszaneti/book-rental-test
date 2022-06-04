import { container } from 'tsyringe';

import IBookRentalRepository from '../repositories/IBookRentalRepository';
import BookRentalRepository from '../infra/typeorm/repositories/BookRentalRepository';

container.registerSingleton<IBookRentalRepository>(
  'BookRentalRepository',
  BookRentalRepository,
);
