import 'dotenv/config'

const dbConfigs = {
  local: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SQL_DB_DEBUG === 'true',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  dev: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SQL_DB_DEBUG === 'true',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SQL_DB_DEBUG === 'true',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  staging: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SQL_DB_DEBUG === 'true',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.SQL_DB_USERNAME,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT || 5432),
    dialect: 'postgres',
    logging: process.env.SQL_DB_DEBUG === 'true',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
}

export = dbConfigs
