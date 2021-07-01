import { PartType } from './part.entity'

/**
 * PartCreateDto type.
 */
export type PartCreateDto = {
  type: PartType
  name: string
}
