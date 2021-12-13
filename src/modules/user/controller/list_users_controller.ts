import { Request, Response } from 'express'
import { ListUsersUseCase } from '../domain/usecases/list_users_usecase'

class ListUsersController {
  private _useCase: ListUsersUseCase
  constructor(readonly useCase: ListUsersUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    try {
      const result = await this._useCase.call()

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListUsersController }
