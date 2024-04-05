import { Base } from '../../utils/base'
import { Task } from '../../task/entities/task.entity'
import { Entity, Column, OneToMany } from 'typeorm'

@Entity()
export class List extends Base {
  @Column()
  name: string

  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[]
}
