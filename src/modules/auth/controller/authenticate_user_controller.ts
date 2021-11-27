import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import { AuthenticateUserUseCase } from '../domain/usecases/authenticate_user_usecase'

@injectable()
export default class AuthenticateUserController {
  private _useCase: AuthenticateUserUseCase
  constructor(
    @inject(TYPES.AuthenticateUserUseCase)
    private readonly useCase: AuthenticateUserUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { cpf, password } = request.body
    const instanceController = container.resolve(AuthenticateUserController)

    try {
      const result = await instanceController._useCase.call(cpf, password)
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { AuthenticateUserController }
