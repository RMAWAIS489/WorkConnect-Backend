export class CreatejobTable1738157868669 {
    name = 'CreatejobTable1738157868669';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "company_name" character varying NOT NULL, "location" character varying NOT NULL, "salary_range" character varying NOT NULL, "job_type" character varying NOT NULL, "employment_status" character varying NOT NULL, "skills_required" text NOT NULL, "application_deadline" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_79ae682707059d5f7655db4212a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_79ae682707059d5f7655db4212a"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }
}
