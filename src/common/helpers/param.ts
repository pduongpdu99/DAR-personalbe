import { IQuery } from '@i/query'
import { ConfigService } from '@nestjs/config'
import CONFIGURATION from '@common/const'

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
      filter: Object.entries(filter),
    }
  }
}
