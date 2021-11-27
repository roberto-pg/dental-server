import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListUsersUseCase } from '../domain/usecases/list_users_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListUsersController {
  private _useCase: ListUsersUseCase
  constructor(
    @inject(TYPES.ListUsersUseCase) private readonly useCase: ListUsersUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const instanceController = container.resolve(ListUsersController)

    try {
      const result = await instanceController._useCase.call()

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListUsersController }
