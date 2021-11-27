import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListDoctorsUseCase } from '../domain/usecases/list_doctors_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsController {
  private _useCase: ListDoctorsUseCase
  constructor(
    @inject(TYPES.ListDoctorsUseCase)
    private readonly useCase: ListDoctorsUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    try {
      const instanceController = container.resolve(ListDoctorsController)

      const result = await instanceController._useCase.call()

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsController }
