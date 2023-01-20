import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTariffEntity1674175734079 implements MigrationInterface {
    name = 'CreateTariffEntity1674175734079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tariff" ("id" character varying NOT NULL, "origin" character varying NOT NULL, "destination" character varying NOT NULL, "valuePerMinute" integer NOT NULL, CONSTRAINT "PK_bbeac9df199ea1c22c6dea75c2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tariff"`);
    }

}
