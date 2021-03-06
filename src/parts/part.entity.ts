import { User } from 'src/users/user.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

/**
 * PartType type.
 */
export type PartType =
  | 'cpu'
  | 'motherboard'
  | 'cpuCooler'
  | 'pcCase'
  | 'pcCooler'
  | 'gpu'
  | 'rom'
  | 'ram'
  | 'powerSupply'

export const PartTypes = [
  'cpu',
  'motherboard',
  'cpuCooler',
  'pcCase',
  'pcCooler',
  'gpu',
  'rom',
  'ram',
  'powerSupply',
]

/**
 * Part entity.
 */
@Entity()
export class Part {
  /**
   * primary key.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * part type.
   */
  @Column()
  type: PartType

  /**
   * part name.
   */
  @Column()
  name: string

  /**
   * users who voted for part.
   */
  @ManyToMany(() => User, ({ parts }) => parts)
  @JoinTable()
  users: User[]
}
