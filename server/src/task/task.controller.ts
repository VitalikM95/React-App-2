import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id)
  }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    return this.taskService.create(payload)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateTaskDto) {
    return this.taskService.update(+id, payload)
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() payload: UpdateTaskDto) {
    return this.taskService.update(+id, payload)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(+id)
  }
}
