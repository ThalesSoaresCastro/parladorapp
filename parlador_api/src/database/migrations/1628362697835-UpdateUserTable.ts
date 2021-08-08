import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateUserTable1628362697835 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.addColumn('users', new TableColumn({
      name: 'edited_in',
      type: 'timestamp',
      default: null,
      isNullable: true
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'edited_in')
  }
}
