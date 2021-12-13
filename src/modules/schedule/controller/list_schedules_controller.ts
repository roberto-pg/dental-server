import { Request, Response } from 'express'
import { ListSchedulesUseCase } from '../domain/usecases/list_schedules_usecase'

class ListSchedulesController {
  private _useCase: ListSchedulesUseCase
  constructor(readonly useCase: ListSchedulesUseCase) {
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

export { ListSchedulesController }
