import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployerTable1738065684640 implements MigrationInterface {
    name = 'CreateEmployerTable1738065684640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employers" ("id" SERIAL NOT NULL, "company_name" character varying(255) NOT NULL, "contact_number" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "website" character varying(255) NOT NULL, "industry_type" character varying(100) NOT NULL, "company_description" text NOT NULL, "linkedin_url" character varying(255) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_91fb7c4cd23362d14b79b72a6f" UNIQUE ("userId"), CONSTRAINT "PK_f2c1aea3e8d7aa3c5fba949c97d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "employerId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_927d78feada658438e819b309d2" UNIQUE ("employerId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_927d78feada658438e819b309d2" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employers" ADD CONSTRAINT "FK_91fb7c4cd23362d14b79b72a6f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employers" DROP CONSTRAINT "FK_91fb7c4cd23362d14b79b72a6f4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_927d78feada658438e819b309d2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_927d78feada658438e819b309d2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "employerId"`);
        await queryRunner.query(`DROP TABLE "employers"`);
    }

}
