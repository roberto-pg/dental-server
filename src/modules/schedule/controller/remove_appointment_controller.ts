import { Request, Response } from 'express'
import { RemoveAppointmentUseCase } from '../domain/usecases/remove_appointment_usecase'

class RemoveAppointmentController {
  private _useCase: RemoveAppointmentUseCase
  constructor(readonly useCase: RemoveAppointmentUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, patientName, cpf, plan, card, scheduled, editable } = request.body

    try {
      const result = await this._useCase.call(id, patientName, cpf, plan, card, scheduled, editable)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { RemoveAppointmentController }
