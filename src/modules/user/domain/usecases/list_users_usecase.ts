import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { IListUsersRepository } from '../repositories/list_users_repository'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListUsersUseCase {
  private _repository: IListUsersRepository
  constructor(
    @inject(TYPES.ListUsersRepositoryImpl)
    private readonly repository: IListUsersRepository
  ) {
    this._repository = repository
  }

  async call() {
    try {
      const instanceUseCase = container.resolve(ListUsersUseCase)

      const users = await instanceUseCase._repository.execute()

      return users
    } catch (error) {
      throw customException('Erro ao buscar usuários')
    }
  }
}

export { ListUsersUseCase }
