import { ParamHelper } from '@helpers/param'
import { ICRUD } from '@i/crud'
import { IQuery } from '@i/query'
import { Repository } from 'typeorm'

export abstract class CRUDImpl<
  C extends E,
  U extends E,
  E extends Record<string, any>,
> implements ICRUD<C, U, E> {
  repo: Repository<E>
  alias: string = ''
  paramHelper: ParamHelper

  async find(query: Record<string, string>) {
    const queryFormatted: IQuery = this.paramHelper.parse(query)
    let builder = this.repo.createQueryBuilder(this.alias)

    queryFormatted.filter.forEach(([k, v]) => {
      if (k.endsWith('_id') || typeof v === 'number' || k === 'id') {
        builder = builder.where(`${this.alias}.${k} = :param`, {
          param: v,
        })
      } else {
        builder = builder.where(`${this.alias}.${k} LIKE :param`, {
          param: v,
        })
      }
    })

    return builder.getMany()
  }

  async findById(id: number) {
    let builder = this.repo.createQueryBuilder(this.alias)
    builder = builder.where(`${this.alias}.id = :param`, { param: id })
    return builder.getOne()
  }

  create(payload: C) {
    return this.repo.insert(payload)
  }

  update(id: number, payload: U) {
    return this.repo.update(id, payload)
  }

  async delete(id: number) {
    await this.repo.delete(id)
  }
}
