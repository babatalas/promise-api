import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Position } from 'src/positions/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Position])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
