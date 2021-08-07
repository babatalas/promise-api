import { MigrationInterface, QueryRunner } from 'typeorm';

export class PositionMigration1628306027402 implements MigrationInterface {
  name = 'PositionMigration1628306027402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "T2_POSITION" ("ID" SERIAL NOT NULL, "CODE" character varying(50) NOT NULL, "NAME" character varying(100) NOT NULL, "IS_DELETE" integer NOT NULL, CONSTRAINT "UQ_50391d1054666d7cc70f753b9b6" UNIQUE ("CODE"), CONSTRAINT "UQ_088479f9d2237207ff5b4e925c1" UNIQUE ("NAME"), CONSTRAINT "PK_eef8348ac3bb6d660d6c202b8b1" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "T2_POSITION"`);
  }
}
