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

  @Get(':taskId')
  findOne(@Param('taskId') taskId: number) {
    return this.taskService.findOne(+taskId)
  }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    return this.taskService.create(payload)
  }

  @Patch(':taskId')
  update(@Param('taskId') taskId: number, @Body() payload: UpdateTaskDto) {
    return this.taskService.update(+taskId, payload)
  }

  @Delete(':taskId')
  remove(@Param('taskId') taskId: number) {
    return this.taskService.remove(+taskId)
  }
}
