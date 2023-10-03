import { validateToken } from '../../../helpers/jwt'

const authentication =
  (allowedRoles: string[]) => async (req: any, res: any, next: any) => {
    try {
      const { headers } = req
      const token = headers.authorization
        ?.replace(/bearer/gi, '')
        .replace(/ /g, '')

      if (token == '' && allowedRoles.includes('GUEST')) {
        req.user = {
          aud: '-',
          role: 'GUEST',
        }

        return next()
      }

      if (token == '') {
        throw new Error('Token not found')
      }

      const result = await validateToken({
        secretKey: '123',
        token,
      })

      if (
        !allowedRoles.includes(result?.role) &&
        result?.role != 'SUPER_ADMIN'
      ) {
        throw new Error("You don't have an access!")
      }

      req.user = result

      return next()
    } catch (error) {
      next(error)
    }
  }

export = authentication
