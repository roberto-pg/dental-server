import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeStatusRepository } from '../repositories/change_status_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ChangeStatusUseCase {
  private _repository: IChangeStatusRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ChangeStatusRepositoryImpl)
    private readonly repository: IChangeStatusRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, active: boolean) {
    const instanceUseCase = container.resolve(ChangeStatusUseCase)

    const user = await instanceUseCase._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      const userId = await instanceUseCase._repository.execute(id, active)

      return userId
    } catch (error) {
      throw customException('Erro para mudar o status')
    }
  }
}

export { ChangeStatusUseCase }
