import { ICRUD } from '@i/crud'
import { CRUDImpl } from './service'

export class CRUDController<
  C extends E,
  U extends E,
  E extends Record<string, any>,
> implements ICRUD<C, U, E> {
  constructor(private service: CRUDImpl<C, U, E>) {}
  find(query: Record<string, string>) {
    return this.service.find(query)
  }
  findById(id: number) {
    return this.service.findById(id)
  }
  create(payload: C) {
    return this.service.create(payload)
  }
  update(id: number, payload: U) {
    return this.service.update(id, payload)
  }
  delete(id: number) {
    return this.service.delete(id)
  }
}
