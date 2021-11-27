import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListSchedulesByScheduledUseCase } from '../domain/usecases/lists_schedules_by_scheduled_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListSchedulesByScheduledController {
  private _useCase: ListSchedulesByScheduledUseCase
  constructor(
    @inject(TYPES.ListSchedulesByScheduledUseCase)
    private readonly useCase: ListSchedulesByScheduledUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { scheduled } = request.params
    const instanceController = container.resolve(
      ListSchedulesByScheduledController
    )

    try {
      const result = await instanceController._useCase.call(scheduled)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListSchedulesByScheduledController }
