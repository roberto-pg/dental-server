import { Request, Response, NextFunction } from 'express'
import { verifyBlackListToken } from '../shared/redis/redis_service'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function protectedRoute(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      Error: 'Um token é requerido'
    })
  }

  const [, token] = authToken.split(' ')

  const disconnected = await verifyBlackListToken(token)

  if (disconnected === 1) {
    return response.status(401).json({ Error: 'This token is blacklisted' })
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET ?? '') as IPayload
    request.user_id = sub

    return next()
  } catch (error) {
    return response.status(401).json({ Error: 'Token expirado' })
  }
}
