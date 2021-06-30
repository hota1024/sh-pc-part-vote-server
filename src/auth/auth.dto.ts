import { IsNotEmpty, IsString } from 'class-validator'

/**
 * LoginDto class.
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
