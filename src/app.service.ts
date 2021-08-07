import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Position } from './positions/entities/position.entity';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly connection: Connection, // private readonly positionsService: PositionsService, // @InjectRepository(Position) // private readonly positionRepo: Repository<Position>, // @InjectRepository(Employee) // private readonly employeeRepo: Repository<Employee>,
  ) {}

  async onApplicationBootstrap() {
    const positionsCount = await this.connection.manager.count(Position);

    if (!positionsCount) {
      try {
        const positionsSeed = [
          { code: 'SA', name: 'System Analyst', isDelete: 0 },
          { code: 'BPS', name: 'BPS', isDelete: 0 },
          { code: 'PRG', name: 'Programmer', isDelete: 0 },
          { code: 'TEST', name: 'Tester', isDelete: 0 },
          { code: 'HELP', name: 'Helpdesk', isDelete: 0 },
        ];
        await Promise.all(
          positionsSeed.map((position) =>
            this.connection.manager.save(
              this.connection.manager.create(Position, position),
            ),
          ),
        );
      } catch (error) {
        console.log(error);
      } finally {
        const positionsCount = await this.connection.manager.count(Position);
        console.log(`employees ${positionsCount} seeded ;)`);
      }
    }

    // const employeesService = app.get(EmployeesService);
    const employeesCount = await this.connection.manager.count(Employee);
    if (!employeesCount) {
      try {
        const employeesSeed = [
          {
            name: 'Yogi Lestari',
            birthDate: new Date('1990-02-14'),
            position: 5,
            idNumber: 14021990,
            gender: 1,
            isDelete: 0,
          },
          {
            name: 'Anggi Setiawan',
            birthDate: new Date('1991-05-10'),
            position: 2,
            idNumber: 10051991,
            gender: 1,
            isDelete: 0,
          },
          {
            name: 'Rosiana',
            birthDate: new Date('1993-04-20'),
            position: 4,
            idNumber: 20041993,
            gender: 2,
            isDelete: 0,
          },
          {
            name: 'Yudi Ismiaji',
            birthDate: new Date('1994-01-11'),
            position: 3,
            idNumber: 11011994,
            gender: 1,
            isDelete: 0,
          },
        ];
        await Promise.all(
          employeesSeed.map((employee) =>
            this.connection.manager.save(
              this.connection.manager.create(Employee, employee),
            ),
          ),
        );
      } catch (error) {
        console.log(error);
      } finally {
        const employeesCount = await this.connection.manager.count(Employee);
        console.log(`employees ${employeesCount} seeded ;)`);
      }
    }
    // app.close();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
