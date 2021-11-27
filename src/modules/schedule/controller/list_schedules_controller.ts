import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListSchedulesUseCase } from '../domain/usecases/list_schedules_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListSchedulesControler {
  private _useCase: ListSchedulesUseCase
  constructor(
    @inject(TYPES.ListSchedulesUseCase)
    private readonly useCase: ListSchedulesUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const instanceController = container.resolve(ListSchedulesControler)

    try {
      const result = await instanceController._useCase.call()

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListSchedulesControler }
