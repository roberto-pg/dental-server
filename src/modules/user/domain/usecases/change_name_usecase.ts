import { IChangeNameRepository } from '../repositories/change_name_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'

class ChangeNameUseCase {
  private _repository: IChangeNameRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    readonly repository: IChangeNameRepository,
    readonly validate: Validate,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(id: string, name: string) {
    if (!name) {
      throw customException('Informe o nome de usuário')
    }

    if (this._dataChecker.nameChecker(name) === false) {
      throw customException('O campo de nome só aceita letras')
    }

    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    try {
      const userId = await this._repository.execute(id, name)

      return userId
    } catch (error) {
      throw customException('Erro para alterar o nome')
    }
  }
}

export { ChangeNameUseCase }
