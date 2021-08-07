import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFriendshipTable1628228742961 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    // habilitando uuid_generate caso não esteja habilitada no pg

    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(new Table({
      name: 'friendships',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'user_id',
          type: 'uuid'
        },
        {
          name: 'friend_id',
          type: 'uuid'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('friendships')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
