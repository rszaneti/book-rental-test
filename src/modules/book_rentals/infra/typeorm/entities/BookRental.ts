import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Customer from '../../../../customers/infra/typeorm/entities/Customer';
import Book from '../../../../books/infra/typeorm/entities/Book';

@Entity('book_rentals')
class BookRental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customers_id: string;

  @ManyToOne(() => Customer, customer => customer.bookrental)
  @JoinColumn({ name: 'customers_id' })
  customer: Customer;

  @Column('uuid')
  books_id: string;

  @ManyToOne(() => Book, book => book.bookrental)
  @JoinColumn({ name: 'books_id' })
  book: Book;

  @Column('timestamp')
  withdrawal_date: Date;

  @Column('timestamp')
  expected_return_date: Date;

  @Column('timestamp')
  return_date: Date;

  @Column('numeric')
  lease_value: number;

  @Column('numeric')
  late_fee: number;

  @Column('numeric')
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BookRental;
