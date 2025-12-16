import { ICRUD } from '@i/crud'
import { CRUDImpl } from './service'
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

export class CRUDController<
  C extends E,
  U extends E,
  E extends Record<string, any>,
> implements ICRUD<C, U, E> {
  constructor(private service: CRUDImpl<C, U, E>) {}
  @Get()
  find(@Query() query: Record<string, string>) {
    return this.service.find(query)
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id)
  }

  @Post()
  create(@Body() payload: C) {
    return this.service.create(payload)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: U) {
    return this.service.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id)
  }
}
