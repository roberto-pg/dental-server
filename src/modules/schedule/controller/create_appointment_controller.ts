import { Request, Response } from 'express'
import { AppointmentModel } from '../../../shared/types'
import { CreateAppointmentUseCase } from '../domain/usecases/create_appointment_usecase'

class CreateAppointmentController {
  private _useCase: CreateAppointmentUseCase
  constructor(readonly useCase: CreateAppointmentUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { scheduleId, cpf, plan, card, scheduled } = <AppointmentModel>(
      request.body
    )

    try {
      const result = await this._useCase.call(
        scheduleId,
        cpf,
        plan,
        card,
        scheduled
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { CreateAppointmentController }
