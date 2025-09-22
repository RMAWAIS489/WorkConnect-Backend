import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobApplicationTable1739362630228 implements MigrationInterface {
    name = 'CreateJobApplicationTable1739362630228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_user_job"`);
        await queryRunner.query(`CREATE TYPE "public"."job_applications_status_enum" AS ENUM('Pending', 'Shortlisted', 'Rejected', 'Accepted')`);
        await queryRunner.query(`CREATE TABLE "job_applications" ("id" SERIAL NOT NULL, "status" "public"."job_applications_status_enum" NOT NULL DEFAULT 'Pending', "resume" character varying(255) NOT NULL, "job_id" integer NOT NULL, "candidate_id" integer NOT NULL, CONSTRAINT "PK_c56a5e86707d0f0df18fa111280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "company_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "location" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_range"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_range" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_type"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "job_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "employment_status"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "employment_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "application_deadline"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "application_deadline" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_79ae682707059d5f7655db4212a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applications" ADD CONSTRAINT "FK_99292c6cd0ed428e8f5b4e22958" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applications" ADD CONSTRAINT "FK_6ed185c3d4417cc1f5ec3f28e5d" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_applications" DROP CONSTRAINT "FK_6ed185c3d4417cc1f5ec3f28e5d"`);
        await queryRunner.query(`ALTER TABLE "job_applications" DROP CONSTRAINT "FK_99292c6cd0ed428e8f5b4e22958"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_79ae682707059d5f7655db4212a"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "application_deadline"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "application_deadline" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "employment_status"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "employment_status" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_type"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "job_type" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_range"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_range" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "location" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "company_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "job_applications"`);
        await queryRunner.query(`DROP TYPE "public"."job_applications_status_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_user_job" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
