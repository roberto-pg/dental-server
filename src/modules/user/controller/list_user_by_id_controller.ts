import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListUserByIdUseCase } from '../domain/usecases/list_user_by_id_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListUserByIdController {
  private _useCase: ListUserByIdUseCase
  constructor(
    @inject(TYPES.ListUserByIdUseCase)
    private readonly useCase: ListUserByIdUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    const instanceController = container.resolve(ListUserByIdController)

    try {
      const result = await instanceController._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListUserByIdController }
