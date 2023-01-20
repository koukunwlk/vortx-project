import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlanTable1674173969903 implements MigrationInterface {
    name = 'CreatePlanTable1674173969903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan" ("id" character varying NOT NULL, "name" character varying NOT NULL, "freeMinutes" integer NOT NULL, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "plan"`);
    }

}
