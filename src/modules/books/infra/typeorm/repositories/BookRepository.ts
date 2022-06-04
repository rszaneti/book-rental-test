import { getRepository, Repository } from 'typeorm';

// Repositories
import IBookRepository from '@modules/books/repositories/IBookRepository';

// DTOs
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';

// Entities
import Book from '../entities/Book';

interface IRequest {
  search_title?: string;
  search_author?: string;
  search_year_edition?: number;
  search_number_edition?: number;
  search_year?: number;
  search_language?: string;
  search_country?: string;
  search_status?: 'habilitado' | 'desabilitado' | '';
  sort_field:
    | 'title'
    | 'author'
    | 'year_edition'
    | 'number_edition'
    | 'year'
    | 'language'
    | 'country'
    | 'status';
  sort_order: 'ASC' | 'DESC';
  page: number;
  rowsperpage: number;
}

class BookRepository implements IBookRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async findAllBooks({
    search_title,
    search_author,
    search_year_edition,
    search_number_edition,
    search_year,
    search_language,
    search_country,
    search_status,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IRequest): Promise<Book[] | undefined> {
    let status = '';

    if (search_status === 'habilitado') {
      status = 'b.status = true';
    } else if (search_status === 'desabilitado') {
      status = 'b.status = false';
    } else {
      status = '1=1';
    }

    const list = await this.ormRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.file', 'f')
      .where(
        search_title ? 'LOWER(b.title) like LOWER(:search_title)' : '1=1',
        {
          search_title: `%${search_title}%`,
        },
      )
      .andWhere(
        search_author ? 'LOWER(b.author) like LOWER(:search_author)' : '1=1',
        {
          search_author: `%${search_author}%`,
        },
      )
      .andWhere(
        search_year_edition ? 'b.year_edition = :search_year_edition' : '1=1',
        {
          search_year_edition: `${search_year_edition}`,
        },
      )
      .andWhere(
        search_number_edition
          ? 'b.number_edition = :search_number_edition'
          : '1=1',
        {
          search_number_edition: `${search_number_edition}`,
        },
      )
      .andWhere(search_year ? 'b.year = :search_year' : '1=1', {
        search_year: `${search_year}`,
      })
      .andWhere(
        search_language
          ? 'LOWER(b.language) like LOWER(:search_language)'
          : '1=1',
        {
          search_language: `%${search_language}%`,
        },
      )
      .andWhere(
        search_country ? 'LOWER(b.country) like LOWER(:search_country)' : '1=1',
        {
          search_country: `%${search_country}%`,
        },
      )
      .andWhere(status)
      .orderBy(`b.${sort_field}`, sort_order, 'NULLS FIRST')
      .take(rowsperpage)
      .skip((page - 1) * rowsperpage)
      .getMany();

    return list;
  }

  public async findTotalAllBooks({
    search_title,
    search_author,
    search_year_edition,
    search_number_edition,
    search_year,
    search_language,
    search_country,
    search_status,
  }: IRequest): Promise<number> {
    let status = '';

    if (search_status === 'habilitado') {
      status = 'b.status = true';
    } else if (search_status === 'desabilitado') {
      status = 'b.status = false';
    } else {
      status = '1=1';
    }

    const countReg = await this.ormRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.file', 'f')
      .where(
        search_title ? 'LOWER(b.title) like LOWER(:search_title)' : '1=1',
        {
          search_title: `%${search_title}%`,
        },
      )
      .andWhere(
        search_author ? 'LOWER(b.author) like LOWER(:search_author)' : '1=1',
        {
          search_author: `%${search_author}%`,
        },
      )
      .andWhere(
        search_year_edition ? 'b.year_edition = :search_year_edition' : '1=1',
        {
          search_year_edition: `${search_year_edition}`,
        },
      )
      .andWhere(
        search_number_edition
          ? 'b.number_edition = :search_number_edition'
          : '1=1',
        {
          search_number_edition: `${search_number_edition}`,
        },
      )
      .andWhere(search_year ? 'b.year = :search_year' : '1=1', {
        search_year: `${search_year}`,
      })
      .andWhere(
        search_language
          ? 'LOWER(b.language) like LOWER(:search_language)'
          : '1=1',
        {
          search_language: `%${search_language}%`,
        },
      )
      .andWhere(
        search_country ? 'LOWER(b.country) like LOWER(:search_country)' : '1=1',
        {
          search_country: `%${search_country}%`,
        },
      )
      .andWhere(status)
      .getCount();

    return countReg;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.file', 'file')
      .where('b.id = :id', { id })
      .getOne();

    return findReg;
  }

  public async findByTitle(title: string): Promise<Book | undefined> {
    const findReg = await this.ormRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.file', 'file')
      .where('b.title = :title', { title })
      .getOne();

    return findReg;
  }

  public async create({
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
  }: ICreateBookDTO): Promise<Book> {
    const createReg = this.ormRepository.create({
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

    await this.ormRepository.save(createReg);

    return createReg;
  }

  public async save(saveReg: Book): Promise<Book> {
    return this.ormRepository.save(saveReg);
  }

  public async updateFile(books_id: string, files_id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Book)
      .set({ files_id })
      .where('id = :books_id', { books_id })
      .execute();
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default BookRepository;
