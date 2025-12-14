import { IQuery } from '@i/query'
import { ConfigService } from '@nestjs/config'
import CONFIGURATION from '@common/const'

const cb = function (
  param: [string, string | number],
): [string, string | number] {
  const [key, value] = param
  let _value: string | number = value

  if (key.startsWith('int_')) {
    _value = Number(value)
  }

  return [key, _value]
}

export abstract class ParamHelper {
  constructor(private readonly config: ConfigService) {}
  parse(query: Record<string, string>): IQuery {
    const { limit, page, order, all, q, ...filter } = query

    const _limit = Number(
      limit ?? this.config.get(CONFIGURATION.DEFAULT_VALUE.PAGINATION.LIMIT),
    )
    const _page = Number(
      page ?? this.config.get(CONFIGURATION.DEFAULT_VALUE.PAGINATION.PAGE),
    )

    const _order =
      order ??
      this.config.get(CONFIGURATION.DEFAULT_VALUE.PAGINATION.ORDER || 'id desc')

    return {
      limit: _limit,
      page: _page,
      skip: ((_page <= 0 ? 1 : _page) - 1) * _limit,
      order: _order,
      q: q ?? '',
      all: all === 'true',
      filter: Object.entries(filter).map(cb),
    }
  }
}
