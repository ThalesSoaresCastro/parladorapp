import {
    MigrationInterface, 
    QueryRunner,
    Table, 
    TableIndex,
    TableColumn, 
    TableForeignKey
} from "typeorm";

export class PostsRefactoringRelation1628226049967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("posts", new TableColumn({
            name:"user_id",
            type:"uuid"
        }));

        await queryRunner.createForeignKey("posts", new TableForeignKey({
            columnNames:["user_id"],
            referencedColumnNames:["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


        const table = await queryRunner.getTable("posts");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("posts", foreignKey as any);
        await queryRunner.dropColumn("posts","user_id");



    }

}
