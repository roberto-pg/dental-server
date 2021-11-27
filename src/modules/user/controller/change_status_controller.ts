import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangeStatusUseCase } from '../domain/usecases/change_status_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeStatusController {
  private _useCase: ChangeStatusUseCase
  constructor(
    @inject(TYPES.ChangeStatusUseCase)
    private readonly useCase: ChangeStatusUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, active } = request.body
    const instanceController = container.resolve(ChangeStatusController)

    try {
      const result = await instanceController._useCase.call(id, active)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeStatusController }
