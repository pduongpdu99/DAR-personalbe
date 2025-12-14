export interface ICRUD<C, U, E> {
  find(query: Record<string, string>): Promise<E[]>
  findById(id: number): Promise<E | null>
  create(payload: C): unknown
  update(id: number, payload: U): unknown
  delete(id: number): Promise<void>
}
