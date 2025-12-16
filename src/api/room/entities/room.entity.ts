import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsNumber, IsOptional } from 'class-validator'
import { CONFIGURATION } from '@common/const'
import { DecorBoolean, DecorString } from '@common/decorator-combined'

@Entity(CONFIGURATION.ORM.ALIAS.ROOM)
export class Room {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date | string | number

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date | string | number

  @Column({ name: 'created_by', type: 'int', nullable: true })
  @IsOptional()
  createdBy?: number

  @Column({ name: 'updated_by', type: 'int', nullable: true })
  @IsOptional()
  updatedBy?: number

  @DecorBoolean({
    name: 'is_active',
    defaultValue: true,
    isOptional: true,
  })
  @IsOptional()
  isActive?: boolean

  @DecorString({})
  name: string
}
