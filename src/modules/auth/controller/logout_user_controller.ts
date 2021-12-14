import { Request, Response } from 'express'
import { LogoutUserUseCase } from '../domain/usecases/logout_user_usecase'

class LogoutUserController {
  private _useCase: LogoutUserUseCase
  constructor(readonly useCase: LogoutUserUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const token = request.headers.authorization.split(' ')[1]
    // const [, token] = request.headers.authorization.split(' ')

    try {
      const result = await this._useCase.call(String(id), token)
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { LogoutUserController }
