import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import { MobListSchedulesByDoctorUseCase } from '../domain/usecases/mob_list_schedules_by_doctor_usecase'

@injectable()
class MobListSchedulesByDoctorController {
  private _useCase: MobListSchedulesByDoctorUseCase
  constructor(
    @inject(TYPES.MobListSchedulesByDoctorUseCase)
    private readonly useCase: MobListSchedulesByDoctorUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { doctorId } = request.params

    try {
      const instanceController = container.resolve(
        MobListSchedulesByDoctorController
      )

      const result = await instanceController._useCase.call(doctorId)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { MobListSchedulesByDoctorController }
