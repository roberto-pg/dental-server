import { Request, Response } from 'express'
import { RemoveUserUseCase } from '../domain/usecases/remove_user_usecase'

class RemoveUserController {
  private _useCase: RemoveUserUseCase
  constructor(readonly useCase: RemoveUserUseCase) {
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

export { RemoveUserController }
