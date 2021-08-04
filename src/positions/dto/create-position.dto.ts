import { IsNumber, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  readonly code: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly isDelete: number;
}
