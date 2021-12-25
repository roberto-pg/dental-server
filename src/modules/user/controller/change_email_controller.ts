import { Request, Response } from 'express'
import { ChangeEmailUseCase } from '../domain/usecases/change_email_usecase'

class ChangeEmailController {
  private _useCase: ChangeEmailUseCase
  constructor(readonly useCase: ChangeEmailUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, email } = request.body

    try {
      const result = await this._useCase.call(id, email)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeEmailController }
