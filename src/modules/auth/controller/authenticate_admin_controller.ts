import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import { AuthenticateAdminUseCase } from '../domain/usecases/authenticate_admin_usecase'

@injectable()
export default class AuthenticateAdminController {
  private _useCase: AuthenticateAdminUseCase
  constructor(
    @inject(TYPES.AuthenticateAdminUseCase)
    private readonly useCase: AuthenticateAdminUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { cpf, password } = request.body
    const instanceController = container.resolve(AuthenticateAdminController)

    try {
      const result = await instanceController._useCase.call(cpf, password)
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { AuthenticateAdminController }
