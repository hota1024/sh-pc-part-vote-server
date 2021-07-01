import { IsIn, IsNotEmpty } from 'class-validator'
import { PartType } from './part.entity'

/**
 * PartCreateDto class.
 */
export class PartCreateDto {
  @IsNotEmpty()
  @IsIn([
    'cpu',
    'motherboard',
    'cpu-cooler',
    'pc-case',
    'pc-cooler',
    'gpu',
    'rom',
    'ram',
    'power-supply',
  ])
  type: PartType

  @IsNotEmpty()
  name: string
}
