import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeeTable1628307143721 implements MigrationInterface {
  name = 'CreateEmployeeTable1628307143721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "T1_EMPLOYEE" ("ID" SERIAL NOT NULL, "NAME" character varying(100) NOT NULL, "BIRTH_DATE" date NOT NULL, "ID_NUMBER" integer NOT NULL, "GENDER" integer NOT NULL, "IS_DELETE" integer NOT NULL, "POSITION_ID" integer, CONSTRAINT "UQ_81de55442987c78400b43c447d3" UNIQUE ("ID_NUMBER"), CONSTRAINT "PK_4ca5c944afb7d67859184d0da31" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "T1_EMPLOYEE" ADD CONSTRAINT "FK_c64875ac277e571a60a7f5c7505" FOREIGN KEY ("POSITION_ID") REFERENCES "T2_POSITION"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "T1_EMPLOYEE" DROP CONSTRAINT "FK_c64875ac277e571a60a7f5c7505"`,
    );
    await queryRunner.query(`DROP TABLE "T1_EMPLOYEE"`);
  }
}
