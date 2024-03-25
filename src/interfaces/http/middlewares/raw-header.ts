import JWT from 'jsonwebtoken'

const keepHeaders = [
  'x-app-platform',
  'x-app-version-code',
  'x-app-version',
  'x-app-device-name',
  'x-app-device-version',
]

const rawHeader = (req: any, res: any, next: any) => {
  try {
    const headers = { ...(req.headers || {}) }
    const vRawHeader: any = {}

    keepHeaders.forEach((keepHeader) => {
      if (headers[keepHeader] && typeof headers[keepHeader] === 'string') {
        vRawHeader[keepHeader] = headers[keepHeader]
      }
    })

    const token = headers.authorization
      ?.replace(/bearer/gi, '')
      .replace(/ /g, '')
    const decoded: any = JWT.decode(token)

    const deviceId = decoded?.deviceId || '-'
    const type = decoded?.type || '-'
    const userType = decoded?.userType || '-'
    const userId = decoded?.userId || '-'
    vRawHeader['x-app-device-id'] = deviceId
    vRawHeader['x-app-type'] = type
    vRawHeader['x-app-user-type'] = userType
    vRawHeader['x-app-user-id'] = userId

    req.rawHeader = vRawHeader
    return next()
  } catch (error: any) {
    req.rawHeader = {
      message: error?.message || '-',
    }
    return next()
  }
}

export = rawHeader
