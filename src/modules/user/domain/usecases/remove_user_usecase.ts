import { IRemoveUserRepository } from '../repositories/remove_user_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class RemoveUserUseCase {
  private _repository: IRemoveUserRepository
  private _validate: Validate
  constructor(readonly repository: IRemoveUserRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      const userId = await this._repository.execute(id)

      return userId
    } catch (error) {
      throw customException('Erro ao excluir usuário')
    }
  }
}

export { RemoveUserUseCase }
