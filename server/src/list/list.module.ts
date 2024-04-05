import { Module } from '@nestjs/common'
import { ListService } from './list.service'
import { ListController } from './list.controller'
import { List } from './entities/list.entity'
import { Task } from '../task/entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([List, Task])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
