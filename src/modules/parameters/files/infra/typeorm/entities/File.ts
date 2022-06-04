import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '../../../../../../config/upload';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  name: string;

  @Column('integer')
  @Exclude()
  size: number;

  @Column()
  @Exclude()
  file_key: string;

  @Column()
  @Exclude()
  mimetype: string;

  @Column()
  @Exclude()
  url: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'file_url' })
  getFileUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return this.file_key
          ? `${process.env.APP_API_URL}/files/${this.file_key}`
          : null;
      case 'azure':
        return `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net/${uploadConfig.config.azure.containerName}/${this.file_key}`;
      default:
        return null;
    }
  }
}

export default File;
