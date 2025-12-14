export abstract class StringDecoratorParam {
  isOptional?: boolean = false
  name?: string
  length?: number = 255
}

export abstract class EnumDecoratorParam {
  isOptional?: boolean = false
  defaultValue: string | number
  type?: any
  name?: string
}

export abstract class NumberDecoratorParam {
  defaultValue?: number = 0
  isOptional?: boolean
  min?: number
  max?: number
  name?: string
}

export abstract class BooleanDecoratorParam {
  isOptional?: boolean = false
  name?: string
  defaultValue?: boolean = false
}

export abstract class JsonDecoratorParam {
  isOptional?: boolean = false
  name?: string
  defaultValue?: any = {}
}
