import { Request, Response } from 'express'
import { CreateAppointmentUseCase } from '../domain/usecases/create_appointment_usecase'

type AppointmentType = {
  scheduleId: string
  patientName: string
  cpf: string
  plan: string
  card: string
  scheduled: boolean
}

class CreateAppointmentController {
  private _useCase: CreateAppointmentUseCase
  constructor(readonly useCase: CreateAppointmentUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { scheduleId, cpf, plan, card, scheduled } = <AppointmentType>(
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
