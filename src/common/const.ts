import { IConfiguration } from '@i/const'

const CONFIGURATION: IConfiguration = {
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
  REDIS: {},
  RATE_LIMITING: {
    LIMIT: 10,
    TTL: 60 * 1000, // miliseconds
  },
}

export default CONFIGURATION
