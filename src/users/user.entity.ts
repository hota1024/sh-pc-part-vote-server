import { Part } from 'src/parts/part.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

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
  @Column()
  email: string

  /**
   * password string that hashed by bcrypt.
   */
  @Column()
  passwordHash: string

  /**
   * parts voted by user.
   */
  @ManyToMany(() => Part, ({ users }) => users)
  parts: Part[]
}
