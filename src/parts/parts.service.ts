import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartCreateDto } from './part.dto'
import { Part, PartType } from './part.entity'

/**
 * PartPublic type.
 */
export type PartPublic = {
  name: string
  type: PartType
  votes: number
}

@Injectable()
export class PartsService {
  @InjectRepository(Part)
  private readonly partsRepo: Repository<Part>

  /**
   * create part and returns it.
   *
   * @param data data.
   */
  create(data: PartCreateDto): Promise<Part> {
    const part = this.partsRepo.create(data)

    return this.partsRepo.save(part)
  }

  /**
   * delete part by given id.
   *
   * @param id id.
   */
  async delete(id: string): Promise<void> {
    await this.partsRepo.delete({ id })
  }

  /**
   * returns all public parts.
   */
  async listPublicParts(): Promise<PartPublic[]> {
    const parts = await this.partsRepo.find({ relations: ['users'] })

    return parts.map(this.toPublic)
  }

  /**
   * returns part public.
   *
   * @param part part.
   */
  toPublic(part: Part): PartPublic {
    return {
      name: part.name,
      type: part.type,
      votes: part.users?.length ?? 0,
    }
  }
}
