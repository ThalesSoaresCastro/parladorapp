import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdatePostsTable1628376867901 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'edited_in',
      type: 'timestamp',
      default: null,
      isNullable: true
    }))
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'changed',
      type: 'boolean',
      default: false,
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'changed')
    await queryRunner.dropColumn('posts', 'edited_in')
  }
}
