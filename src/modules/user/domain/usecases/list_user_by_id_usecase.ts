import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListUserByIdRepository } from '../repositories/list_user_by_id_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListUserByIdUseCase {
  private _repository: IListUserByIdRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ListUserByIdRepositoryImpl)
    private readonly repository: IListUserByIdRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const instanceUseCase = container.resolve(ListUserByIdUseCase)

    const userId = await this._validate.verifyUserId(id)

    if (!userId) {
      throw customException('Usuário não encontrado')
    }

    try {
      const user = await instanceUseCase._repository.execute(id)

      return user
    } catch (error) {
      throw customException('Erro ao buscar usuários')
    }
  }
}

export { ListUserByIdUseCase }
