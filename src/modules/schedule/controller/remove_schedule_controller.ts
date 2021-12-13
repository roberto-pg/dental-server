import { Request, Response } from 'express'
import { RemoveScheduleUseCase } from '../domain/usecases/remove_schedule_usecase'

class RemoveScheduleController {
  private _useCase: RemoveScheduleUseCase
  constructor(readonly useCase: RemoveScheduleUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    try {
      const result = await this._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}

export { RemoveScheduleController }
