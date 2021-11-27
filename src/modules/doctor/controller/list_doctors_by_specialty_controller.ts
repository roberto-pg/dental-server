import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListDoctorsBySpecialtyUseCase } from '../domain/usecases/list_doctors_by_specialty_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsBySpecialtyController {
  private _useCase: ListDoctorsBySpecialtyUseCase
  constructor(
    @inject(TYPES.ListDoctorsBySpecialtyUseCase)
    private readonly useCase: ListDoctorsBySpecialtyUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { specialty } = request.params
    try {
      const instanceController = container.resolve(
        ListDoctorsBySpecialtyController
      )

      const result = await instanceController._useCase.call(specialty)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsBySpecialtyController }
