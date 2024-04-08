import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { Base } from '../../utils/base'
import { Task } from '../../task/entities/task.entity'
import { Board } from '../../board/entities/board.entity'

@Entity()
export class List extends Base {
  @Column()
  name: string

  @ManyToOne(() => Board, (board) => board.lists, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board

  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[]
}
