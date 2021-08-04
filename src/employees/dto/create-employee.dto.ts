import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  readonly name: string;

  @IsDate()
  readonly birthDate: Date;

  @IsNumber()
  readonly position: number;

  @IsNumber()
  readonly idNumber: number;

  @IsNumber()
  readonly gender: number;

  @IsNumber()
  readonly isDelete: number;
}
