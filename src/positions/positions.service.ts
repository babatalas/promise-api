import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepo: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    const position = await this.positionRepo.findOne({
      where: [
        {
          code: createPositionDto.code,
        },
        {
          name: createPositionDto.name,
        },
      ],
    });

    if (position) {
      throw new BadRequestException(`Duplicate position code or position name`);
    }

    return this.positionRepo.save(this.positionRepo.create(createPositionDto));
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const take = paginationQuery.offset || 10;
    const skip = paginationQuery.limit || 0;

    const [result, total] = await this.positionRepo.findAndCount({
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
    const position = await this.positionRepo.findOne({
      id,
    });

    if (!position) {
      throw new NotFoundException(`Position #${id} not found`);
    }

    return position;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepo.preload({
      id,
      ...updatePositionDto,
    });

    if (!position) {
      throw new NotFoundException(`Position #${id} not found`);
    }

    return this.positionRepo.save(position);
  }

  async remove(id: number) {
    return this.positionRepo.remove(await this.findOne(id));
  }
}
