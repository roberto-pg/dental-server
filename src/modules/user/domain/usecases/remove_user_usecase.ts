import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveUserRepository } from '../repositories/remove_user_repository'
import { TYPES } from '../../../../shared/ioc/types'
import { Validate } from '../../../../shared/utils/validate'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class RemoveUserUseCase {
  private _repository: IRemoveUserRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.RemoveUserRepositoryImpl)
    private readonly repository: IRemoveUserRepository,
    @inject(TYPES.Validate) private validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const instanceUseCase = container.resolve(RemoveUserUseCase)

    const user = await instanceUseCase._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      const userId = await instanceUseCase._repository.execute(id)

      return userId
    } catch (error) {
      throw customException('Erro ao excluir usuário')
    }
  }
}

export { RemoveUserUseCase }
