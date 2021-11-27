import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListSchedulesByScheduledRepository } from '../repositories/list_schedules_by_scheduled_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListSchedulesByScheduledUseCase {
  private _repository: IListSchedulesByScheduledRepository
  constructor(
    @inject(TYPES.ListSchedulesByScheduledRepositoryImpl)
    private readonly repository: IListSchedulesByScheduledRepository
  ) {
    this._repository = repository
  }

  async call(scheduled: string) {
    const instanceUseCase = container.resolve(ListSchedulesByScheduledUseCase)
    let scheduledBool: boolean

    if (scheduled === 'true') {
      scheduledBool = true
    } else if (scheduled === 'false') {
      scheduledBool = false
    } else {
      customException('Falha na chamada dos agendamentos')
    }

    try {
      const schedules = await instanceUseCase._repository.execute(scheduledBool)

      return schedules
    } catch (error) {
      throw customException('Falha para listar os agendamentos')
    }
  }
}

export { ListSchedulesByScheduledUseCase }
