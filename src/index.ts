require('dotenv').config()
import 'reflect-metadata'
import runHttp from './interfaces/http'
import runHttpInternal from './interfaces/http-internal'
import sql from './drivers/sequelize'

const vInterface = process.env.INTERFACE

const run = async () => {
  await sql.authenticate()

  switch (vInterface) {
    case 'HTTP':
      runHttp()
      break
    case 'HTTP_INTERNAL':
      runHttpInternal()
      break

    default:
      break
  }
}

run()
