import { IConfiguration } from '@i/const'

export const CONFIGURATION: IConfiguration = {
  DEFAULT_VALUE: {
    PAGINATION: {
      LIMIT: '10',
      PAGE: '1',
      ORDER: 'id desc',
    },
  },
  DATABASE: {
    MYSQL: {
      DATABASE: 'db_temporary',
      HOST: '127.0.0.1',
      PASSWORD: 'Aa123456@',
      PORT: 3306,
      USERNAME: 'root',
    },
  },
  RATE_LIMITING: {
    LIMIT: 10,
    TTL: 60 * 1000, // miliseconds
  },
  ORM: {
    ALIAS: {
      USER: 'user',
    },
  },
}

export const ENDPOINT = {
  USER: 'user',
  CHAT: 'chat',
  MESSAGE: 'message',
}
