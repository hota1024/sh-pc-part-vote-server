import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/**
 * User entity.
 */
@Entity()
export class User {
  /**
   * id.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * email.
   */
  @Column('string')
  email: string

  /**
   * password string that hashed by bcrypt.
   */
  @Column('string')
  passwordHash: string
}