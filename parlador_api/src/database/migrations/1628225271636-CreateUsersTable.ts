import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1628225271636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        
        //habilitando uuid_generate caso não esteja habilitada no pg

        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name:'users',
            columns:[
                {
                    name:'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy:"uuid",
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique:true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
