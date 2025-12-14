import {
  BooleanDecoratorParam,
  EnumDecoratorParam,
  JsonDecoratorParam,
  NumberDecoratorParam,
  StringDecoratorParam,
} from '@i/decorators/typeorm-decor-param'
import { applyDecorators } from '@nestjs/common'
import { Column } from 'typeorm'
import {
  IsJSON,
  IsOptional,
  IsNumber,
  Max,
  Min,
  IsString,
  IsEnum,
} from 'class-validator'

export function DecorString({
  isOptional,
  length,
  name,
}: StringDecoratorParam) {
  const decorators: PropertyDecorator[] = [
    IsString(),
    ...(!isOptional ? [Min(1)] : []),
    ...(length ? [Max(length)] : []),
    ...(isOptional ? [IsOptional()] : []),
  ]

  const columnConfig = {
    ...(length && { length }),
    ...(name && { name }),
    ...(isOptional && { nullable: true }),
  }

  return applyDecorators(Column(columnConfig), ...decorators)
}

export function DecorEnum({
  defaultValue,
  type,
  name,
  isOptional,
}: EnumDecoratorParam) {
  const _set = new Array<PropertyDecorator>()
  _set.push(IsEnum(type))

  const decorators: PropertyDecorator[] = [
    IsEnum(type),
    ...(isOptional ? [IsOptional()] : []),
  ]

  const columnConfig = {
    default: defaultValue,
    ...(name && { name }),
    ...(isOptional && { nullable: true }),
  }

  return applyDecorators(Column(columnConfig), ...decorators)
}

export function DecorNumber({
  defaultValue,
  isOptional,
  min,
  max,
  name,
}: NumberDecoratorParam) {
  const decorators: PropertyDecorator[] = [
    IsNumber(),
    ...(!isOptional ? [Min(min || 0)] : []),
    ...(max ? [Max(max)] : []),
    ...(isOptional ? [IsOptional()] : []),
  ]

  const columnConfig = {
    default: defaultValue,
    ...(name && { name }),
    ...(isOptional && { nullable: true }),
  }

  return applyDecorators(Column(columnConfig), ...decorators)
}

export function DecorJSON({
  isOptional,
  name,
  defaultValue,
}: JsonDecoratorParam) {
  const decorators: PropertyDecorator[] = [
    IsJSON(),
    ...(isOptional ? [IsOptional()] : []),
  ]

  const columnConfig = {
    default: defaultValue,
    ...(name && { name }),
    ...(isOptional && { nullable: true }),
  }

  return applyDecorators(
    Column({
      ...columnConfig,
      type: 'json',
    }),
    ...decorators,
  )
}

export function DecorBoolean({
  isOptional,
  name,
  defaultValue,
}: BooleanDecoratorParam) {
  const decorators: PropertyDecorator[] = [
    ...(isOptional ? [IsOptional()] : []),
  ]

  const columnConfig = {
    default: defaultValue,
    ...(name && { name }),
    ...(isOptional && { nullable: true }),
  }

  return applyDecorators(
    Column({
      ...columnConfig,
      type: 'boolean',
    }),
    ...decorators,
  )
}
