export interface IQuery {
  limit: number
  page: number
  skip: number
  order: string
  q: string
  all: boolean
  filter: [string, string | number][]
}
