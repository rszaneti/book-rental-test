import { v4 as uuidv4 } from 'uuid';

import IFileRepository from '@modules/parameters/files/repositories/IFileRepository';
import ICreateFileDTO from '@modules/parameters/files/dtos/ICreateFileDTO';

import File from '@modules/parameters/files/infra/typeorm/entities/File';

class FileRepository implements IFileRepository {
  private files: File[] = [];

  public async findById(id: string): Promise<File | undefined> {
    const findFile = this.files.find(file => file.id === id);

    return findFile;
  }

  public async findByFileKey(file_key: string): Promise<File | undefined> {
    const findFile = this.files.find(file => file.file_key === file_key);

    return findFile;
  }

  public async create({
    name,
    size,
    file_key,
    mimetype,
  }: ICreateFileDTO): Promise<File> {
    const file = new File();

    Object.assign(file, {
      id: uuidv4(),
      name,
      size,
      file_key,
      mimetype,
    });

    this.files.push(file);

    return file;
  }

  public async delete(id: string): Promise<void> {
    this.files.filter(file => file.id !== id);
  }
}

export default FileRepository;
