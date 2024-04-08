import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll()
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: number) {
    return this.boardService.findOne(+boardId)
  }

  @Post()
  create(@Body() payload: CreateBoardDto) {
    return this.boardService.create(payload)
  }

  @Patch(':boardId')
  update(@Param('boardId') boardId: number, @Body() payload: UpdateBoardDto) {
    return this.boardService.update(+boardId, payload)
  }

  @Delete(':boardId')
  remove(@Param('boardId') boardId: number) {
    return this.boardService.remove(+boardId)
  }
}
