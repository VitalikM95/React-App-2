import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { List } from './entities/list.entity'
import { Task } from '../task/entities/task.entity'
import { Board } from '../board/entities/board.entity'

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(List)
    private listRepo: Repository<List>,
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
  ) {}

  async getListsByBoard(boardId: number) {
    if (boardId === 0) {
      return []
    }
    const board = await this.boardRepo.findOne({
      where: { id: boardId },
    })
    if (!board) {
      throw new NotFoundException('Board not found')
    }
    const lists = await this.listRepo.find({
      where: { board: { id: boardId } },
      relations: ['tasks'],
    })
    return lists
  }

  async create(payload: CreateListDto) {
    if (!payload.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const { boardId, name } = payload
    const board = await this.boardRepo.findOne({
      where: { id: boardId },
    })
    if (!board) {
      throw new NotFoundException('Board not found')
    }
    const isExist = await this.listRepo.findOne({
      where: { name, board: { id: boardId } },
    })
    if (isExist) {
      throw new ConflictException('A List with this name already exists')
    }
    const newList = this.listRepo.create({ name, board })
    return this.listRepo.save(newList)
  }

  async update(listId: number, changes: UpdateListDto) {
    if (!changes.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const { boardId, ...otherChanges } = changes
    const isExist = await this.listRepo.findOne({
      where: { name: otherChanges.name, board: { id: boardId } },
    })
    if (isExist) {
      throw new ConflictException('A List with this name already exists')
    }
    const list = await this.listRepo.findOne({
      where: { id: listId },
      relations: ['tasks'],
    })
    if (!list) {
      throw new BadRequestException('List not found')
    }
    await this.listRepo.update(listId, { name: otherChanges.name })
    for (const task of list.tasks) {
      task.status = otherChanges.name
      await this.taskRepo.save(task)
    }
    return this.listRepo.findOne({ where: { id: listId } })
  }

  async remove(listId: number) {
    const foundList = await this.listRepo.findOne({ where: { id: listId } })
    if (!foundList) {
      throw new NotFoundException(`List not found`)
    }
    await this.listRepo.delete(listId)
    return foundList
  }
}
