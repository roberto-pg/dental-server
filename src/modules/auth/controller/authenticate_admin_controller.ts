import { Request, Response } from 'express'
import { AuthenticateAdminUseCase } from '../domain/usecases/authenticate_admin_usecase'

export default class AuthenticateAdminController {
  private _useCase: AuthenticateAdminUseCase
  constructor(useCase: AuthenticateAdminUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { cpf, password } = request.body

    try {
      const result = await this._useCase.call(cpf, password)
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { AuthenticateAdminController }
