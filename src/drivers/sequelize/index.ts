import { Sequelize } from 'sequelize-typescript'
import User from './models/user'
import Client from './models/client'
import Device from './models/device'

const connection = new Sequelize({
  host: process.env.SQL_DB_HOST || '127.0.0.1',
  dialect: 'postgres',
  username: process.env.SQL_DB_USERNAME,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_NAME,
  logging: process.env.SQL_DB_DEBUG === 'true',
  benchmark: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  port: Number(process.env.SQL_DB_PORT || 5432),
  models: [User, Client, Device],
})

export = connection
