import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('T2_POSITION')
export class Position {
  @PrimaryGeneratedColumn({
    name: 'ID',
  })
  id: number;

  @Column({
    name: 'CODE',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  code: string;

  @Column({
    name: 'NAME',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({
    name: 'IS_DELETE',
    type: 'int',
    width: 11,
  })
  isDelete: number;
}
