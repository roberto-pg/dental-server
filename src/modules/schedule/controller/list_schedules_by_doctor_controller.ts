import { Request, Response } from 'express'
import { ListSchedulesByDoctorUseCase } from '../domain/usecases/list_schedules_by_doctor_usecase'

class ListSchedulesByDoctorController {
  private _useCase: ListSchedulesByDoctorUseCase
  constructor(readonly useCase: ListSchedulesByDoctorUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { doctorId, yearAndMonth } = request.params

    try {
      const result = await this._useCase.call(doctorId, yearAndMonth)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListSchedulesByDoctorController }
