import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveScheduleRepository } from '../repositories/remove_schedule_repository'
import { Validate } from '../../../../shared/utils/validate'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class RemoveScheduleUseCase {
  private _repository: IRemoveScheduleRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.RemoveScheduleRepositoryImpl)
    private readonly repository: IRemoveScheduleRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const instanceUseCase = container.resolve(RemoveScheduleUseCase)

    const schedule = await instanceUseCase._validate.verifyScheduleId(id)

    if (!schedule) {
      throw customException('Agendamento não encontrado')
    }

    try {
      const result = await instanceUseCase._repository.execute(id)

      return result
    } catch (error) {
      throw customException('Falha para excluir agendamento')
    }
  }
}

export { RemoveScheduleUseCase }
