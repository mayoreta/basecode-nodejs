import JWT from 'jsonwebtoken'

const keepHeaders = [
  'x-app-platform',
  'x-app-version-code',
  'x-app-version',
  'x-app-device-id',
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

    if (!('x-app-device-id' in vRawHeader)) {
      const token = headers.authorization
        ?.replace(/bearer/gi, '')
        .replace(/ /g, '')
      const decoded: any = JWT.decode(token)

      const deviceId = decoded?.device || '-'
      vRawHeader['x-app-device-id'] = deviceId
    }

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
