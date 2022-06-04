import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import File from '../../../../parameters/files/infra/typeorm/entities/File';
import BookRentals from '../../../../book_rentals/infra/typeorm/entities/BookRental';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  files_id: string;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'files_id' })
  file: File;

  @OneToMany(() => BookRentals, bookrental => bookrental.customer)
  @JoinColumn()
  bookrental: BookRentals[];

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  author: string;

  @Column('int4')
  year_edition: number;

  @Column('int4')
  number_edition: number;

  @Column('int4')
  year: number;

  @Column()
  language: string;

  @Column()
  country: string;

  @Column('int4')
  pages: number;

  @Column('numeric')
  weight: number;

  @Column('numeric')
  lease_value: number;

  @Column('bool')
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Book;
