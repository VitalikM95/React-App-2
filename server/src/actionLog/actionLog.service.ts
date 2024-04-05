import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActionLog } from './entities/actionLog.entity'

@Injectable()
export class ActionLogService {
  constructor(
    @InjectRepository(ActionLog)
    private readonly actionLogRepository: Repository<ActionLog>,
  ) {}

  async logAction(
    action: string,
    details: string,
    entityType: string,
  ): Promise<void> {
    const newLog = new ActionLog()
    newLog.action = action
    newLog.details = details
    newLog.entityType = entityType
    await this.actionLogRepository.save(newLog)

    const logsCount = await this.actionLogRepository.count()
    const maxLogsCount = 40
    if (logsCount > maxLogsCount) {
      const oldestLogs = await this.actionLogRepository.find({
        order: { timestamp: 'ASC' },
        take: logsCount - maxLogsCount,
      })
      await this.actionLogRepository.remove(oldestLogs)
    }
  }

  async getAll(): Promise<ActionLog[]> {
    return this.actionLogRepository.find()
  }
}
