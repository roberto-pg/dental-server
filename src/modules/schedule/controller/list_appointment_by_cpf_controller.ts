import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ListAppointmentByCpfUseCase } from '../domain/usecases/list_appointment_by_cpf_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListAppointmentByCpfController {
  private _useCase: ListAppointmentByCpfUseCase
  constructor(
    @inject(TYPES.ListAppointmentByCpfUseCase)
    private readonly useCase: ListAppointmentByCpfUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { cpf } = request.query
    const instanceController = container.resolve(ListAppointmentByCpfController)

    try {
      const result = await instanceController._useCase.call(String(cpf))

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListAppointmentByCpfController }
