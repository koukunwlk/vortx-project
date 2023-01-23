import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTariffEntity1674513826195 implements MigrationInterface {
    name = 'CreateTariffEntity1674513826195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tariff" ("id" uuid NOT NULL, "origin" character varying NOT NULL, "destination" character varying NOT NULL, "valuePerMinute" double precision NOT NULL, CONSTRAINT "PK_bbeac9df199ea1c22c6dea75c2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tariff"`);
    }

}
