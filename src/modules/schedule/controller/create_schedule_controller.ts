import { Request, Response } from 'express'
import { CreateScheduleUseCase } from '../domain/usecases/create_schedule_usecase'

class CreateScheduleController {
  private _useCase: CreateScheduleUseCase
  constructor(readonly useCase: CreateScheduleUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { doctorId } = request.params
    const {
      doctorName,
      specialty,
      monthDay,
      weekDay,
      patientName,
      cpf,
      plan,
      card,
      scheduled,
      editable,
      timeToSchedule,
    } = request.body

    try {
      const result = await this._useCase.call(
        doctorId,
        doctorName,
        specialty,
        monthDay,
        weekDay,
        patientName,
        cpf,
        plan,
        card,
        scheduled,
        editable,
        timeToSchedule
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { CreateScheduleController }
