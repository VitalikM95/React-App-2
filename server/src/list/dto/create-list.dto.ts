import { IsNotEmpty, IsString } from 'class-validator'

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly boardId: number
}
