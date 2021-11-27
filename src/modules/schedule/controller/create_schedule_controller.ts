import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
import { CreateScheduleUseCase } from '../domain/usecases/create_schedule_usecase'

@injectable()
class CreateScheduleController {
  private _useCase: CreateScheduleUseCase
  constructor(
    @inject(TYPES.CreateScheduleUseCase)
    private readonly useCase: CreateScheduleUseCase
  ) {
    this._useCase = useCase
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
      plain,
      card,
      scheduled,
      editable,
      timeToSchedule
    } = request.body

    try {
      const instanceController = container.resolve(CreateScheduleController)

      const result = await instanceController._useCase.call(
        doctorId,
        doctorName,
        specialty,
        monthDay,
        weekDay,
        patientName,
        cpf,
        plain,
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
