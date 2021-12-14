import { Request, Response } from 'express'
import { MobListSchedulesByDoctorUseCase } from '../domain/usecases/mob_list_schedules_by_doctor_usecase'

class MobListSchedulesByDoctorController {
  private _useCase: MobListSchedulesByDoctorUseCase
  constructor(readonly useCase: MobListSchedulesByDoctorUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { doctorId } = request.params

    try {
      const result = await this._useCase.call(doctorId)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { MobListSchedulesByDoctorController }
