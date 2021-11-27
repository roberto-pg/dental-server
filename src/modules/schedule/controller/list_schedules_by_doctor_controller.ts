import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListSchedulesByDoctorUseCase } from '../domain/usecases/list_schedules_by_doctor_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListSchedulesByDoctorController {
  private _useCase: ListSchedulesByDoctorUseCase
  constructor(
    @inject(TYPES.ListSchedulesByDoctorUseCase)
    private readonly useCase: ListSchedulesByDoctorUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { doctorId, yearAndMonth } = request.params

    try {
      const instanceController = container.resolve(
        ListSchedulesByDoctorController
      )

      const result = await instanceController._useCase.call(
        doctorId,
        yearAndMonth
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListSchedulesByDoctorController }
