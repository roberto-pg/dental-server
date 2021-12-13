import { Request, Response } from 'express'
import { ChangeEditableUseCase } from '../domain/usecases/change_editable_usecase'

class ChangeEditableController {
  private _useCase: ChangeEditableUseCase
  constructor(readonly useCase: ChangeEditableUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, editable } = request.body

    try {
      const result = await this._useCase.call(id, editable)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeEditableController }
