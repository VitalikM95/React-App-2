import { Controller, Get } from '@nestjs/common'
import { ActionLogService } from './actionLog.service'
import { ActionLog } from './entities/actionLog.entity'

@Controller('action-log')
export class ActionLogController {
  constructor(private readonly actionLogService: ActionLogService) {}

  @Get()
  async getAll(): Promise<ActionLog[]> {
    return this.actionLogService.getAll()
  }
}
