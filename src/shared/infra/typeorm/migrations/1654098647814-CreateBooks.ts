import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateBooks1654098647814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'files_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'year_edition',
            type: 'int',
            default: 0,
          },
          {
            name: 'number_edition',
            type: 'int',
            default: 0,
          },
          {
            name: 'year',
            type: 'int',
            default: 0,
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'pages',
            type: 'int',
            default: 0,
          },
          {
            name: 'weight',
            type: 'numeric(7,2)',
            default: 0,
          },
          {
            name: 'lease_value',
            type: 'numeric(7,2)',
            default: 0,
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
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
      'books',
      new TableForeignKey({
        name: 'files_books',
        columnNames: ['files_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
