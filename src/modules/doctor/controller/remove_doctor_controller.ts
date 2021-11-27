import 'reflect-metadata'
import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'
import { RemoveDoctorUseCase } from '../domain/usecases/remove_doctor_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveDoctorController {
  private _useCase: RemoveDoctorUseCase
  constructor(
    @inject(TYPES.RemoveDoctorUseCase)
    private readonly useCase: RemoveDoctorUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params

    const instanceController = container.resolve(RemoveDoctorController)

    try {
      const result = await instanceController._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { RemoveDoctorController }
