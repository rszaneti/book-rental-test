import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFiles1654098624925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'int',
            default: 0,
          },
          {
            name: 'file_key',
            type: 'varchar',
          },
          {
            name: 'mimetype',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'url',
            type: 'varchar',
            default: null,
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
