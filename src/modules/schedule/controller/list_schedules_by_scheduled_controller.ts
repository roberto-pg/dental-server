import { Request, Response } from 'express'
import { ListSchedulesByScheduledUseCase } from '../domain/usecases/lists_schedules_by_scheduled_usecase'

class ListSchedulesByScheduledController {
  private _useCase: ListSchedulesByScheduledUseCase
  constructor(readonly useCase: ListSchedulesByScheduledUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { scheduled } = request.params

    try {
      const result = await this._useCase.call(scheduled)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListSchedulesByScheduledController }
