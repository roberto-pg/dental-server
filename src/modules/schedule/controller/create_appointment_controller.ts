import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { CreateAppointmentUseCase } from '../domain/usecases/create_appointment_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

type AppointmentType = {
  id: string
  patientName: string
  cpf: string
  plain: string
  card: string
  scheduled: boolean
}

@injectable()
class CreateAppointmentController {
  private _useCase: CreateAppointmentUseCase
  constructor(
    @inject(TYPES.CreateAppointmentUseCase)
    private readonly useCase: CreateAppointmentUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, cpf, plain, card, scheduled } = <AppointmentType>request.body

    try {
      const instanceController = container.resolve(CreateAppointmentController)

      const result = await instanceController._useCase.call(
        id,
        cpf,
        plain,
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
