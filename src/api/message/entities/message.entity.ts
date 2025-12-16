import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsNumber, IsOptional } from 'class-validator'
import { CONFIGURATION } from '@common/const'
import {
  DecorBoolean,
  DecorNumber,
  DecorString,
} from '@common/decorator-combined'

@Entity(CONFIGURATION.ORM.ALIAS.MESSAGE)
export class Message {
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

  @DecorNumber({ name: 'chat_id', defaultValue: 0 })
  chatId: number

  @DecorNumber({ name: 'room_id', defaultValue: 0 })
  roomId: number

  @DecorNumber({ name: 'message_id', defaultValue: 0, isOptional: true })
  messageId?: number

  @DecorNumber({ name: 'bot_id', defaultValue: 0, isOptional: true })
  botId?: number

  @DecorString({ isOptional: true })
  content: string

  @DecorBoolean({ isOptional: true, defaultValue: false, name: 'is_edited' })
  isEdited: boolean
}
