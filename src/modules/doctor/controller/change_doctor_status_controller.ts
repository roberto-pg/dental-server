import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangeDoctorStatusUseCase } from '../domain/usecases/change_doctor_status_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeDoctorStatusController {
  private _useCase: ChangeDoctorStatusUseCase
  constructor(
    @inject(TYPES.ChangeDoctorStatusUseCase)
    private readonly useCase: ChangeDoctorStatusUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, active } = request.body
    const instanceController = container.resolve(ChangeDoctorStatusController)

    try {
      const result = await instanceController._useCase.call(id, active)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeDoctorStatusController }
