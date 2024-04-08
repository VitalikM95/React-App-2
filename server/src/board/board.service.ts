import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { Board } from './entities/board.entity'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
  ) {}

  findAll() {
    return this.boardRepo.find()
  }

  async findOne(boardId: number) {
    if (boardId === 0) {
      return null
    }
    const board = await this.boardRepo.findOne({
      where: { id: boardId },
      relations: ['lists', 'lists.tasks'],
    })
    if (!board) {
      throw new NotFoundException('Board not found')
    }
    return board
  }

  async create(payload: CreateBoardDto) {
    if (!payload.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const isExist = await this.boardRepo.findOne({
      where: { name: payload.name },
    })
    if (isExist) {
      throw new ConflictException('A Board with this name already exists')
    }
    const newBoard = this.boardRepo.create(payload)
    return this.boardRepo.save(newBoard)
  }

  async update(boardId: number, changes: UpdateBoardDto) {
    if (!changes.name) {
      throw new BadRequestException('Name field cannot be empty')
    }
    const isExist = await this.boardRepo.findOne({
      where: { name: changes.name },
    })
    if (isExist) {
      throw new ConflictException('A Board with this name already exists')
    }
    await this.boardRepo.update(boardId, changes)
    return this.findOne(boardId)
  }

  async remove(boardId: number) {
    const foundBoard = await this.boardRepo.findOne({ where: { id: boardId } })
    if (!foundBoard) {
      throw new NotFoundException('Board not found')
    }
    await this.boardRepo.delete(boardId)
    return foundBoard
  }
}
