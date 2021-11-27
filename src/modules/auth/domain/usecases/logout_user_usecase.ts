import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { ILogoutUserRepository } from '../repositories/logout_user_repository'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import {
  setBlackList,
  deleteUserCache
} from '../../../../shared/redis/redis_service'

@injectable()
class LogoutUserUseCase {
  private _repository: ILogoutUserRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.LogoutUserRepositoryImpl)
    private readonly repository: ILogoutUserRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, token: string) {
    const instanceUseCase = container.resolve(LogoutUserUseCase)

    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      Promise.all([setBlackList(token, id), deleteUserCache(id)])
      const userId = instanceUseCase._repository.execute(id)

      return userId
    } catch (error) {
      throw customException('Erro ao efetuat logout')
    }
  }
}

export { LogoutUserUseCase }
