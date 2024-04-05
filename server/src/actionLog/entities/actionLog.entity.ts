import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class ActionLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  action: string

  @Column({ nullable: true })
  details: string

  @Column({ nullable: true })
  entityType: string

  @CreateDateColumn()
  timestamp: Date
}
