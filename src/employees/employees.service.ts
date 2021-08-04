import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepo.findOne({
      where: {
        idNumber: createEmployeeDto.idNumber,
      },
    });

    if (employee) {
      throw new BadRequestException(`Duplicate employee ID Number`);
    }

    return this.employeeRepo.save(this.employeeRepo.create(createEmployeeDto));
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const take = paginationQuery.offset || 10;
    const skip = paginationQuery.limit || 0;

    const [result, total] = await this.employeeRepo.findAndCount({
      // relations: ['position'],
      where: { isDelete: 0 },
      skip,
      take,
    });

    return {
      data: result,
      total,
    };
  }

  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne({
      id,
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepo.preload({
      id,
      ...updateEmployeeDto,
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return this.employeeRepo.save(employee);
  }

  async remove(id: number) {
    return this.employeeRepo.remove(await this.findOne(id));
  }
}
