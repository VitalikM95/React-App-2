import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { List } from '../../list/entities/list.entity'
import { Base } from '../../utils/base'

@Entity()
export class Task extends Base {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date

  @Column({ default: 'Low' })
  priority: string

  @Column({ default: 'To Do' })
  status: string

  @ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: List
}
