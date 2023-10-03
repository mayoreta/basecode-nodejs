import git from 'git-rev-sync'
import moment from 'moment-timezone'

const version = `${git.branch()}_${git.long()}_${git.message()}`
const updatedAt = moment(git.date())
  .tz('Asia/Jakarta')
  .format('DD/MM/YYYY HH:mm:ss Z')

const errorHandler = (err: any, req: any, res: any, next: any) => {
  const { message } = err
  let { status } = err
  let data = ''
  let errorResponse

  req.errorData = {
    code: err?.status || 400,
    message: err?.message || null,
    errors: err?.errors,
    updated_at: updatedAt,
    version,
    stack: err?.stack || {},
  }

  switch (true) {
    case typeof err === 'string':
      errorResponse = res.status(status || 400).json({
        version,
        status: false,
        message: err,
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
    case typeof err === 'object':
      errorResponse = res.status(status || 400).json({
        version,
        status: false,
        message,
      })
      break
    default:
      errorResponse = next(res)
  }

  return errorResponse
}

export = errorHandler
