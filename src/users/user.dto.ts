import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @Length(6, 32)
  password: string
}
