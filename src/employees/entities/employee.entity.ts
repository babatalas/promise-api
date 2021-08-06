import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity('T1_EMPLOYEE')
export class Employee {
  @PrimaryGeneratedColumn({
    name: 'ID',
  })
  id: number;

  @Column({
    name: 'NAME',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'BIRTH_DATE',
    type: 'date',
  })
  birthDate: Date;

  @ManyToOne(() => Position, (position: Position) => position.id, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'POSITION_ID',
  })
  position: number;

  @Column({
    name: 'ID_NUMBER',
    type: 'int',
    width: 11,
    unique: true,
  })
  idNumber: number;

  @Column({
    name: 'GENDER',
    type: 'int',
    width: 11,
  })
  gender: number;

  @Column({
    name: 'IS_DELETE',
    type: 'int',
    width: 11,
  })
  isDelete: number;
}
