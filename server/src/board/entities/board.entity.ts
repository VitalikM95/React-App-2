import { Entity, Column, OneToMany } from 'typeorm'
import { Base } from '../../utils/base'
import { List } from '../../list/entities/list.entity'

@Entity()
export class Board extends Base {
  @Column()
  name: string

  @OneToMany(() => List, (list) => list.board, { cascade: true })
  lists: List[]
}
