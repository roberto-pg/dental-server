import { ILogoutUserRepository } from '../repositories/logout_user_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import {
  setBlackList,
  deleteUserCache,
} from '../../../../shared/redis/redis_service'

class LogoutUserUseCase {
  private _repository: ILogoutUserRepository
  private _validate: Validate
  constructor(
    readonly repository: ILogoutUserRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, token: string) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      Promise.all([setBlackList(token, id), deleteUserCache(id)])
      const userId = this._repository.execute(id)

      return userId
    } catch (error) {
      throw customException('Erro ao efetuat logout')
    }
  }
}

export { LogoutUserUseCase }
