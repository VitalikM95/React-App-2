import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { FindOneOptions, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'
import { List } from '../list/entities/list.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(List)
    private listRepo: Repository<List>,
  ) {}

  findAll() {
    return this.taskRepo.find({
      relations: ['list'],
    })
  }

  async findOne(id: number) {
    if (id === 0) {
      return null
    }
    const options: FindOneOptions<Task> = {
      where: { id },
      relations: ['list'],
    }
    const foundTask = await this.taskRepo.findOne(options)
    if (!foundTask) {
      throw new NotFoundException(`Task not found`)
    }
    return foundTask
  }

  async create(payload: CreateTaskDto) {
    if (!payload.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const list = await this.listRepo.findOne({
      where: { name: payload.status },
    })
    if (!list) {
      const newList = this.listRepo.create({ name: payload.status })
      await this.listRepo.save(newList)
      const newData = { ...payload, list: newList }
      const newTask = this.taskRepo.create(newData)
      return this.taskRepo.save(newTask)
    } else {
      const newTask = this.taskRepo.create({ ...payload, list })
      return this.taskRepo.save(newTask)
    }
  }

  async update(id: number, changes: UpdateTaskDto) {
    const list = await this.listRepo.findOne({
      where: { name: changes.status },
    })
    if (!list) {
      const newList = this.listRepo.create({ name: changes.status })
      await this.listRepo.save(newList)
      const newData = { ...changes, list: newList }
      await this.taskRepo.update(id, newData)
    } else {
      const newData = { ...changes, list: list }
      await this.taskRepo.update(id, newData)
    }
    const options: FindOneOptions<Task> = {
      where: { id },
      relations: ['list'],
    }
    return this.taskRepo.findOne(options)
  }

  async remove(id: number) {
    const foundTask = await this.taskRepo.findOne({ where: { id } })
    if (!foundTask) {
      throw new NotFoundException(`Task not found`)
    }
    await this.taskRepo.delete(id)
    return foundTask
  }
}
