import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanEntity1674513758687 implements MigrationInterface {
    name = 'CreatePlanEntity1674513758687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" uuid NOT NULL, "name" character varying NOT NULL, "freeMinutes" integer NOT NULL, CONSTRAINT "UQ_8aa73af67fa634d33de9bf874ab" UNIQUE ("name"), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "plan"`);
    }

}
