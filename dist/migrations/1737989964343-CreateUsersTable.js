import { Table } from "typeorm";
export class CreateUsersTable1737989964343 {
    async up(queryRunner) {
        // Create the users table
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                }, {
                    name: "name",
                    type: "varchar",
                    length: "100",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "100",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "role",
                    type: "enum",
                    enum: ["candidate", "employer", "admin"],
                    default: "'candidate'",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
            ],
        }));
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "employerId"`);
    }
    async down(queryRunner) {
        // Drop the users table in case of a rollback
        await queryRunner.dropTable("users");
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "employerId" int`);
    }
}
