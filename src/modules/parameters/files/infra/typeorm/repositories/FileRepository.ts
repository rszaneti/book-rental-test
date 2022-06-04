import { getRepository, Repository } from 'typeorm';

import IFileRepository from '@modules/parameters/files/repositories/IFileRepository';
import ICreateFileDTO from '@modules/parameters/files/dtos/ICreateFileDTO';

import File from '../entities/File';

class FileRepository implements IFileRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async findById(id: string): Promise<File | undefined> {
    const file = await this.ormRepository.findOne(id);

    return file;
  }

  public async findByFileKey(file_key: string): Promise<File | undefined> {
    const file = await this.ormRepository.findOne({ where: { file_key } });

    return file;
  }

  public async create({
    name,
    size,
    file_key,
    mimetype,
  }: ICreateFileDTO): Promise<File> {
    const file = this.ormRepository.create({
      name,
      size,
      file_key,
      mimetype,
    });

    await this.ormRepository.save(file);

    return file;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FileRepository;
