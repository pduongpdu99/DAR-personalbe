export interface DB {
  HOST: string
  PORT: number
  USERNAME: string
  PASSWORD: string
  DATABASE: string
}

export interface IConfiguration {
  DEFAULT_VALUE: {
    PAGINATION: {
      LIMIT: string
      PAGE: string
      ORDER?: string
      Q?: string
    }
  }
  DATABASE: {
    MYSQL?: DB
    MONGO?: Record<string, string>
  }
  RATE_LIMITING: {
    LIMIT: number
    TTL: number // miliseconds
  }
}
