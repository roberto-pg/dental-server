import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { RemoveUserUseCase } from '../domain/usecases/remove_user_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveUserController {
  private _useCase: RemoveUserUseCase
  constructor(
    @inject(TYPES.RemoveUserUseCase) private readonly useCase: RemoveUserUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const instanceController = container.resolve(RemoveUserController)

    try {
      const result = await instanceController._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { RemoveUserController }
