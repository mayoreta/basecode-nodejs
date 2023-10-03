import JWT, { JwtPayload } from 'jsonwebtoken'

type JwtData = {
  aud: string
  role: string
}

type ParamsGenerateToken = {
  expiredInMinute: number
  secretKey: string
  data: JwtData
}

type ParamsValidateToken = {
  token: string
  secretKey: string
}

export const generateToken = async (params: ParamsGenerateToken) => {
  const options = {
    expiresIn: `${params.expiredInMinute}m`,
  }

  const token = await JWT.sign(params.data, params.secretKey, options)

  return token
}

export const validateToken = async (
  params: ParamsValidateToken,
): Promise<JwtData> => {
  const data = (await JWT.verify(params.token, params.secretKey)) as JwtPayload

  return {
    aud: data?.aud as string,
    role: data?.role,
  }
}
