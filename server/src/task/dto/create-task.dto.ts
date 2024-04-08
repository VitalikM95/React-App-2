import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
  @IsString()
  readonly description: string
  @IsString()
  readonly priority: string
  @IsString()
  readonly status: string
  @IsDate()
  readonly dueDate: Date
  @IsNotEmpty()
  readonly boardId: number
}
