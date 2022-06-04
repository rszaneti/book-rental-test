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

@Entity('customers')
class Customer {
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
  name: string;

  @Column()
  email: string;

  @Column()
  cellphone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
