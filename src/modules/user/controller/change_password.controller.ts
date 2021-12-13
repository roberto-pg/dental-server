import { Request, Response } from 'express'
import { ChangePasswordUseCase } from '../domain/usecases/change_password_usecase'

class ChangePasswordController {
  private _useCase: ChangePasswordUseCase
  constructor(readonly useCase: ChangePasswordUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, oldPassword, newPassword } = request.body

    try {
      const result = await this._useCase.call(id, oldPassword, newPassword)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangePasswordController }
