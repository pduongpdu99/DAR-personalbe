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
  DecorEnum,
  DecorString,
} from '@common/decorator-combined'
import { PhoneCode } from '@common/enums/define-field'

@Entity(CONFIGURATION.ORM.ALIAS.USER)
export class User {
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

  @DecorString({ name: 'firstname', length: 20, isOptional: true })
  firstName: string

  @DecorString({ name: 'lastname', length: 20 })
  lastName: string

  @DecorString({ name: 'middlename', length: 20, isOptional: true })
  middleName: string

  @DecorString({ name: 'email', length: 50 })
  email: string

  @DecorString({ name: 'phone', length: 15, isOptional: true })
  phone: string

  @DecorString({ name: 'facebook', length: 50, isOptional: true })
  facebook: string

  @DecorString({ name: 'linkedin', length: 50, isOptional: true })
  linkedin: string

  @DecorString({ name: 'X', length: 50, isOptional: true })
  X: string

  @DecorEnum({
    name: 'phone_code',
    type: PhoneCode,
    defaultValue: PhoneCode.VN,
  })
  phoneCode: string

  get fullname() {
    if (this.middleName) {
      return [this.lastName, this.middleName, this.firstName].join(' ')
    }
    return [this.lastName, this.fullname].join(' ')
  }
}
