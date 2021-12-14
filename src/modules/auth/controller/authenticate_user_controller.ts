import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from '../domain/usecases/authenticate_user_usecase'

export default class AuthenticateUserController {
  private _useCase: AuthenticateUserUseCase
  constructor(readonly useCase: AuthenticateUserUseCase) {
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

export { AuthenticateUserController }
