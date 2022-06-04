import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBookRentals1654098655830
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'books_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'customers_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'withdrawal_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
          {
            name: 'return_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
          {
            name: 'lease_value',
            type: 'numeric(7,2)',
            default: 0,
          },
          {
            name: 'late_fee',
            type: 'numeric(7,2)',
            default: 0,
          },
          {
            name: 'total',
            type: 'numeric(7,2)',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'book_rentals',
      new TableForeignKey({
        name: 'books_book_rentals',
        columnNames: ['books_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'book_rentals',
      new TableForeignKey({
        name: 'customers_book_rentals',
        columnNames: ['customers_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book_rentals');
  }
}
