import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
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

  async findOne(taskId: number) {
    if (taskId === 0) {
      return null
    }
    const foundTask = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['list'],
    })
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
      where: { name: payload.status, board: { id: payload.boardId } },
    })
    if (!list) {
      throw new NotFoundException('This list was not found')
    }
    const newTask = this.taskRepo.create({ ...payload, list })
    return this.taskRepo.save(newTask)
  }

  async update(taskId: number, changes: UpdateTaskDto) {
    const list = await this.listRepo.findOne({
      where: { name: changes.status, board: { id: changes.boardId } },
    })
    if (!list) {
      throw new NotFoundException('This list was not found')
    }
    await this.taskRepo.update(taskId, { ...changes, list: list })
    return this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['list'],
    })
  }

  async remove(taskId: number) {
    const foundTask = await this.taskRepo.findOne({ where: { id: taskId } })
    if (!foundTask) {
      throw new NotFoundException(`Task not found`)
    }
    await this.taskRepo.delete(taskId)
    return foundTask
  }
}
