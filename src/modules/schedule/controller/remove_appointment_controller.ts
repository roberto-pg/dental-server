import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { RemoveAppointmentUseCase } from '../domain/usecases/remove_appointment_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class RemoveAppointmentController {
  private _useCase: RemoveAppointmentUseCase
  constructor(
    @inject(TYPES.RemoveAppointmentUseCase)
    private readonly useCase: RemoveAppointmentUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, patientName, cpf, plain, card, scheduled, editable } =
      request.body
    const instanceController = container.resolve(RemoveAppointmentController)

    try {
      const result = await instanceController._useCase.call(
        id,
        patientName,
        cpf,
        plain,
        card,
        scheduled,
        editable
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { RemoveAppointmentController }
