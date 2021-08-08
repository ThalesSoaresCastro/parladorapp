import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export class PostsRefactoringRelation1628226049967 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.addColumn('posts', new TableColumn({
      name: 'userId',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('posts', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('posts')
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1)
    await queryRunner.dropForeignKey('posts', foreignKey as any)
    await queryRunner.dropColumn('posts', 'userId')
  }
}
