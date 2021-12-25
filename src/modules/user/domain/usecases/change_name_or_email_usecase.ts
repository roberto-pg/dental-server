import { IChangeNameOrEmailRepository } from '../repositories/change_name_or_email_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'

class ChangeNameOrEmailUseCase {
  private _repository: IChangeNameOrEmailRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    readonly repository: IChangeNameOrEmailRepository,
    readonly validate: Validate,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(id: string, name: string, email: string) {
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

    if (!email) {
      throw customException('Informe o Email do usuário')
    }

    if (this._dataChecker.emailChecker(email) === false) {
      throw customException('Email inválido')
    }

    const emailExists = await this._validate.verifyUserEmail(email)

    if (emailExists != null) {
      throw customException('O email já existe')
    }

    try {
      const userId = await this._repository.execute(id, name, email)

      return userId
    } catch (error) {
      throw customException('Erro para alterar o nome ou o email')
    }
  }
}

export { ChangeNameOrEmailUseCase }
