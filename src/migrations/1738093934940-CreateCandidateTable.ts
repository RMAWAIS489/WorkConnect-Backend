import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCandidateTable1738093934940 implements MigrationInterface {
    name = 'CreateCandidateTable1738093934940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidates" ("id" SERIAL NOT NULL, "fullname" character varying(255) NOT NULL, "contact_number" character varying(50) NOT NULL, "email" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "skill" character varying(100) NOT NULL, "education" character varying(100) NOT NULL, "work_experience" character varying(100) NOT NULL, "resume_link" character varying(100) NOT NULL, "portfolio_link" character varying(100) NOT NULL, "linkedin_url" character varying(255) NOT NULL, "github_url" character varying(255) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_10d0384a816526f8c7f6b1e67b" UNIQUE ("userId"), CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD CONSTRAINT "FK_10d0384a816526f8c7f6b1e67b3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidates" DROP CONSTRAINT "FK_10d0384a816526f8c7f6b1e67b3"`);
        await queryRunner.query(`DROP TABLE "candidates"`);
    }

}
