import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActionLog } from './entities/actionLog.entity'
import { ActionLogController } from './actionLog.controller'
import { ActionLogService } from './actionLog.service'

@Module({
  imports: [TypeOrmModule.forFeature([ActionLog])],
  controllers: [ActionLogController],
  providers: [ActionLogService],
  exports: [ActionLogService],
})
export class ActionLogModule {}
