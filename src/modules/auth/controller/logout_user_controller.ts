import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import { LogoutUserUseCase } from '../domain/usecases/logout_user_usecase'

@injectable()
class LogoutUserController {
  private _useCase: LogoutUserUseCase
  constructor(
    @inject(TYPES.LogoutUserUseCase) private readonly useCase: LogoutUserUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const token = request.headers.authorization.split(' ')[1]
    // const [, token] = request.headers.authorization.split(' ')
    const instanceController = container.resolve(LogoutUserController)

    try {
      const result = await instanceController._useCase.call(String(id), token)
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { LogoutUserController }
