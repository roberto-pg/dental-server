import { IRemoveScheduleRepository } from '../repositories/remove_schedule_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class RemoveScheduleUseCase {
  private _repository: IRemoveScheduleRepository
  private _validate: Validate
  constructor(readonly repository: IRemoveScheduleRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const schedule = await this._validate.verifyScheduleId(id)

    if (!schedule) {
      throw customException('Agendamento não encontrado')
    }

    try {
      const result = await this._repository.execute(id)

      return result
    } catch (error) {
      throw customException('Falha para excluir agendamento')
    }
  }
}

export { RemoveScheduleUseCase }
