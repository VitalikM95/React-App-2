import { IsDate, IsString } from 'class-validator'

export class UpdateTaskDto {
  @IsString()
  readonly name?: string
  @IsString()
  readonly description?: string
  @IsString()
  readonly priority?: string
  @IsString()
  readonly status?: string
  @IsDate()
  readonly dueDate?: Date
}
