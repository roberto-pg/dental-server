import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListSchedulesRepository } from '../repositories/list_schedules_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListSchedulesUseCase {
  private _repository: IListSchedulesRepository
  constructor(
    @inject(TYPES.ListSchedulesRepositoryImpl)
    private readonly repository: IListSchedulesRepository
  ) {
    this._repository = repository
  }

  async call() {
    const instanceUseCase = container.resolve(ListSchedulesUseCase)

    try {
      const schedules = await instanceUseCase._repository.execute()

      return schedules
    } catch (error) {
      throw customException('Falha para listar os agendamentos')
    }
  }
}

export { ListSchedulesUseCase }
