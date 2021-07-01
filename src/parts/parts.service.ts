import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PartCreateDto } from './part.dto'
import { Part, PartType } from './part.entity'

/**
 * PartPublic type.
 */
export type PartPublic = {
  id: string
  name: string
  type: PartType
  votes: number
}

/**
 * VoteStatus type.
 */
export type VoteStatus = {
  all: number
  cpu: number
  motherboard: number
  cpuCooler: number
  pcCase: number
  pcCooler: number
  gpu: number
  rom: number
  ram: number
  powerSupply: number
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
   * returns parts of the specified type.
   *
   * @param type type.
   */
  async listTypedPublic(type: PartType): Promise<PartPublic[]> {
    const parts = await this.partsRepo.find({
      where: {
        type,
      },
      relations: ['users'],
    })

    return parts.map(this.toPublic)
  }

  /**
   * returns vote status.
   */
  async voteStatus(): Promise<VoteStatus> {
    const parts = await this.partsRepo.find({ relations: ['users'] })

    const cpu = parts.filter(({ type }) => type === 'cpu').length
    const motherboard = parts.filter(({ type }) => type === 'cpu').length
    const cpuCooler = parts.filter(({ type }) => type === 'cpu').length
    const pcCase = parts.filter(({ type }) => type === 'cpu').length
    const pcCooler = parts.filter(({ type }) => type === 'cpu').length
    const gpu = parts.filter(({ type }) => type === 'cpu').length
    const rom = parts.filter(({ type }) => type === 'cpu').length
    const ram = parts.filter(({ type }) => type === 'cpu').length
    const powerSupply = parts.filter(({ type }) => type === 'cpu').length
    const all =
      cpu +
      motherboard +
      cpuCooler +
      pcCase +
      pcCooler +
      gpu +
      rom +
      ram +
      powerSupply

    const status: VoteStatus = {
      all,
      cpu,
      motherboard,
      cpuCooler,
      pcCase,
      pcCooler,
      gpu,
      rom,
      ram,
      powerSupply,
    }

    return status
  }

  /**
   * returns part public.
   *
   * @param part part.
   */
  toPublic(part: Part): PartPublic {
    return {
      id: part.id,
      name: part.name,
      type: part.type,
      votes: part.users?.length ?? 0,
    }
  }
}
