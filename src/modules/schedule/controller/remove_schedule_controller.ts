import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import container from '../../../shared/ioc/inversify_config'
import { RemoveScheduleUseCase } from '../domain/usecases/remove_schedule_usecase'
import { TYPES } from '../../../shared/ioc/types'

@injectable()
class RemoveScheduleController {
  private _useCase: RemoveScheduleUseCase
  constructor(
    @inject(TYPES.RemoveScheduleUseCase)
    private readonly useCase: RemoveScheduleUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    try {
      const instanceController = container.resolve(RemoveScheduleController)

      const result = await instanceController._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}

export { RemoveScheduleController }
