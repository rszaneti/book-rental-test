import { inject, injectable } from 'tsyringe';

// Repository
import IBookRepository from '@modules/books/repositories/IBookRepository';

// Entities
import Book from '@modules/books/infra/typeorm/entities/Book';

import AppError from '@shared/errors/AppError';

interface IRequest {
  files_id: string;
  title: string;
  description: string;
  author: string;
  year_edition: number;
  number_edition: number;
  year: number;
  language: string;
  country: string;
  pages: number;
  weight: number;
  lease_value: number;
  status: boolean;
}

@injectable()
class CreateBookService {
  constructor(
    @inject('BookRepository')
    private bookRepository: IBookRepository,
  ) {}

  public async execute({
    files_id,
    title,
    description,
    author,
    year_edition,
    number_edition,
    year,
    language,
    country,
    pages,
    weight,
    lease_value,
    status,
  }: IRequest): Promise<Book> {
    const checkTitleExist = await this.bookRepository.findByTitle(title);

    if (checkTitleExist) {
      throw new AppError('Título do livro já cadastrado.');
    }

    const createReg = this.bookRepository.create({
      files_id,
      title,
      description,
      author,
      year_edition,
      number_edition,
      year,
      language,
      country,
      pages,
      weight,
      lease_value,
      status,
    });

    return createReg;
  }
}

export default CreateBookService;
