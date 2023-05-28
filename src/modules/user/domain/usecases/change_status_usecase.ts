import { IChangeStatusRepository } from '../repositories/change_status_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangeStatusUseCase {
  private _repository: IChangeStatusRepository
  private _validate: Validate
  constructor(readonly repository: IChangeStatusRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, active: boolean) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      const userId = await this._repository.execute(id, active)

      return userId
    } catch (error) {
      throw customException('Erro para mudar o status')
    }
  }
}

export { ChangeStatusUseCase }
