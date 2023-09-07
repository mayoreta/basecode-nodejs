import { version as appVersion } from '../../../../package.json'

const version = `v${appVersion}`

const errorHandler = (err: any, req: any, res: any, next: any) => {
  const { message } = err
  let { status } = err
  let data = ''
  let errorResponse

  switch (true) {
    case typeof err === 'string':
      errorResponse = res.status(status || 400).json({
        version,
        status: false,
        message: err,
      })
      break
    case typeof err === 'object':
      errorResponse = res.status(status || 400).json({
        version,
        status: false,
        message,
      })
      break
    case err.isJoi:
      status = 400
      data = err.data || ''

      errorResponse = res.send({
        version,
        code: status || 500,
        message,
        data,
      })
      break
    default:
      errorResponse = next(res)
  }

  return errorResponse
}

export = errorHandler
