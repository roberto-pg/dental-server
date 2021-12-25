import { Request, Response } from 'express'
import { ChangeNameUseCase } from '../domain/usecases/change_name_usecase'

class ChangeNameController {
  private _useCase: ChangeNameUseCase
  constructor(readonly useCase: ChangeNameUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, name } = request.body

    try {
      const result = await this._useCase.call(id, name)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeNameController }
