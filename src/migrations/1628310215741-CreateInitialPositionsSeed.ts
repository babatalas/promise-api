import { CreatePositionDto } from 'src/positions/dto/create-position.dto';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialPositionsSeed1628310215741
  implements MigrationInterface
{
  private readonly positionsSeed: CreatePositionDto[];
  private readonly tableName: string;
  constructor() {
    this.positionsSeed = [
      { code: 'SA', name: 'System Analyst', isDelete: 0 },
      { code: 'BPS', name: 'BPS', isDelete: 0 },
      { code: 'PRG', name: 'Programmer', isDelete: 0 },
      { code: 'TEST', name: 'Tester', isDelete: 0 },
      { code: 'HELP', name: 'Helpdesk', isDelete: 0 },
    ];
    this.tableName = 'T2_POSITION';
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      this.positionsSeed.map(({ code, name, isDelete }) =>
        queryRunner.query(`
            INSERT INTO ${this.tableName} (code, name, isDelete)
            VALUES ('${code}','${name}','${isDelete}')
          `),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        TRUNCATE ${this.tableName}
      `);
  }
}
