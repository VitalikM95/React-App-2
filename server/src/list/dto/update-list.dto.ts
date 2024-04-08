import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly boardId: number
}
