import File from '../infra/typeorm/entities/File';
import ICreateFileDTO from '../dtos/ICreateFileDTO';

export default interface IFileRepository {
  findByFileKey(file_key: string): Promise<File | undefined>;
  findById(id: string): Promise<File | undefined>;
  create(data: ICreateFileDTO): Promise<File>;
  delete(id: string): Promise<void>;
}
