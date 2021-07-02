import { IsIn, IsNotEmpty } from 'class-validator'
import { PartType, PartTypes } from './part.entity'

/**
 * PartCreateDto class.
 */
export class PartCreateDto {
  @IsNotEmpty()
  @IsIn(PartTypes)
  type: PartType

  @IsNotEmpty()
  name: string
}

/**
 * PartBuokCreateDto class.
 */
export class PartBulkCreateDto {
  @IsNotEmpty()
  @IsIn(PartTypes)
  type: PartType

  names: string[]
}
