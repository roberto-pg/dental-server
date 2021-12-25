import { IChangeEmailRepository } from '../repositories/change_email_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'

class ChangeEmailUseCase {
  private _repository: IChangeEmailRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    readonly repository: IChangeEmailRepository,
    readonly validate: Validate,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(id: string, email: string) {
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
      const userId = await this._repository.execute(id, email)

      return userId
    } catch (error) {
      throw customException('Erro para alterar o email')
    }
  }
}

export { ChangeEmailUseCase }
