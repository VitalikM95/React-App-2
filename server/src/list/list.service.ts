import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { List } from './entities/list.entity'
import { Task } from '../task/entities/task.entity'

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(List)
    private listRepo: Repository<List>,
  ) {}

  findAll() {
    return this.listRepo.find({
      relations: ['tasks'],
    })
  }

  async findOne(id: number) {
    const options: FindOneOptions<List> = {
      where: { id },
      relations: ['tasks'],
    }
    const foundList = await this.listRepo.findOne(options)
    if (!foundList) {
      throw new NotFoundException(`List not found`)
    }
    return foundList
  }

  async create(payload: CreateListDto) {
    if (!payload.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const isExist = await this.listRepo.findOne({
      where: { name: payload.name },
    })
    if (isExist) {
      throw new ConflictException('A List with this name already exists')
    }
    const newList = this.listRepo.create(payload)
    return this.listRepo.save(newList)
  }

  async update(id: number, changes: UpdateListDto) {
    if (!changes.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const isExist = await this.listRepo.findOne({
      where: { name: changes.name },
    })
    if (isExist) {
      throw new ConflictException('A List with this name already exists')
    }
    const options: FindOneOptions<List> = {
      where: { id },
      relations: ['tasks'],
    }
    const list = await this.listRepo.findOne(options)
    if (!list) {
      throw new BadRequestException('List not found')
    }
    await this.listRepo.update(id, { name: changes.name })
    for (const task of list.tasks) {
      task.status = changes.name
      await this.taskRepo.save(task)
    }
    return this.listRepo.findOne({ where: { id } })
  }

  async remove(id: number) {
    const foundList = await this.listRepo.findOne({ where: { id } })
    if (!foundList) {
      throw new NotFoundException(`List not found`)
    }
    await this.listRepo.delete(id)
    return foundList
  }
}
