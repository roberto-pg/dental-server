import { Request, Response } from 'express'
import { ListAppointmentByCpfUseCase } from '../domain/usecases/list_appointment_by_cpf_usecase'

class ListAppointmentByCpfController {
  private _useCase: ListAppointmentByCpfUseCase
  constructor(readonly useCase: ListAppointmentByCpfUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { cpf } = request.query

    try {
      const result = await this._useCase.call(String(cpf))

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListAppointmentByCpfController }
