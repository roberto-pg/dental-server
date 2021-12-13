import { Request, Response } from 'express'
import { ChangeNameOrEmailUseCase } from '../domain/usecases/change_name_or_email_usecase'

class ChangeNameOrEmailController {
  private _useCase: ChangeNameOrEmailUseCase
  constructor(readonly useCase: ChangeNameOrEmailUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, name, email } = request.body

    try {
      const result = await this._useCase.call(id, name, email)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeNameOrEmailController }
