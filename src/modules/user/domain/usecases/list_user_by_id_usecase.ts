import { IListUserByIdRepository } from '../repositories/list_user_by_id_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ListUserByIdUseCase {
  private _repository: IListUserByIdRepository
  private _validate: Validate
  constructor(
    readonly repository: IListUserByIdRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const userId = await this._validate.verifyUserId(id)

    if (!userId) {
      throw customException('Usuário não encontrado')
    }

    try {
      const user = await this._repository.execute(id)

      return user
    } catch (error) {
      throw customException('Erro ao buscar usuários')
    }
  }
}

export { ListUserByIdUseCase }
