import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListDoctorsByIdUseCase } from '../domain/usecases/list_doctors_by_id_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsByIdController {
  private _useCase: ListDoctorsByIdUseCase
  constructor(
    @inject(TYPES.ListDoctorsByIdUseCase)
    private readonly useCase: ListDoctorsByIdUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    try {
      const instanceController = container.resolve(ListDoctorsByIdController)

      const result = await instanceController._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsByIdController }
