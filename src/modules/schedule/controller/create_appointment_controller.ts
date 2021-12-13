import { Request, Response } from 'express'
import { CreateAppointmentUseCase } from '../domain/usecases/create_appointment_usecase'

type AppointmentType = {
  id: string
  patientName: string
  cpf: string
  plain: string
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
    const { id, cpf, plain, card, scheduled } = <AppointmentType>request.body

    try {
      const result = await this._useCase.call(id, cpf, plain, card, scheduled)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { CreateAppointmentController }
