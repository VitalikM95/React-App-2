import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Get,
} from '@nestjs/common'
import { ListService } from './list.service'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':boardId')
  getListsByBoard(@Param('boardId') boardId: number) {
    return this.listService.getListsByBoard(+boardId)
  }

  @Post()
  create(@Body() payload: CreateListDto) {
    return this.listService.create(payload)
  }

  @Patch(':listId')
  update(@Param('listId') listId: number, @Body() payload: UpdateListDto) {
    return this.listService.update(+listId, payload)
  }

  @Delete(':listId')
  remove(@Param('listId') listId: number) {
    return this.listService.remove(+listId)
  }
}
