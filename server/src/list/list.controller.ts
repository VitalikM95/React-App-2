import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { ListService } from './list.service'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll() {
    return this.listService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.listService.findOne(+id)
  }

  @Post()
  create(@Body() payload: CreateListDto) {
    return this.listService.create(payload)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateListDto) {
    return this.listService.update(+id, payload)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.listService.remove(+id)
  }
}
