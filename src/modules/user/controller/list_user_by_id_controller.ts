import { Request, Response } from 'express'
import { ListUserByIdUseCase } from '../domain/usecases/list_user_by_id_usecase'

class ListUserByIdController {
  private _useCase: ListUserByIdUseCase
  constructor(readonly useCase: ListUserByIdUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    try {
      const result = await this._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListUserByIdController }
