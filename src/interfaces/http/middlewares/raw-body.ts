const secretBodies = [
  'pin',
  'password',
  'password_confirmation',
  'otp',
  'refresh_token',
  'access_token',
  'birth_date',
  'birth_place',
  'gender',
  'insurance_number',
  'street',
  'rt_rw',
  'card_id',
  'id_card',
]
const hideBodies = [
  'username',
  'first_name',
  'last_name',
  'email',
  'phone',
  'phone_number',
  'phonenumber',
  'birth_place',
]

const rawBody = (req: any, res: any, next: any) => {
  try {
    const vRawBody: any = { ...(req.body || {}) }
    secretBodies.forEach((secretBody) => {
      if (vRawBody[secretBody] && typeof vRawBody[secretBody] === 'string') {
        vRawBody[secretBody] = '***'
      }
    })

    hideBodies.forEach((hideBody) => {
      if (vRawBody[hideBody] && typeof vRawBody[hideBody] === 'string') {
        const lengthChar: number = vRawBody?.[hideBody]?.length * 0.5
        const hideData = vRawBody[hideBody].slice(0, -lengthChar)
        vRawBody[hideBody] = `${hideData}***`
      }
    })

    req.rawBody = vRawBody
    return next()
  } catch (error: any) {
    req.rawBody = {
      message: error?.message || '-',
    }
    return next()
  }
}

export = rawBody
