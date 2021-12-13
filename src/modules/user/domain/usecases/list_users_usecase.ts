import { IListUsersRepository } from '../repositories/list_users_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ListUsersUseCase {
  private _repository: IListUsersRepository
  constructor(readonly repository: IListUsersRepository) {
    this._repository = repository
  }

  async call() {
    try {
      const users = await this._repository.execute()

      return users
    } catch (error) {
      throw customException('Erro ao buscar usuários')
    }
  }
}

export { ListUsersUseCase }
