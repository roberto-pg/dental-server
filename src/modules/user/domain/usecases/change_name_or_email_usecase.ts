import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { IChangeNameOrEmailRepository } from '../repositories/change_name_or_email_repository'
import { Validate } from '../../../../shared/utils/validate'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'

@injectable()
class ChangeNameOrEmailUseCase {
  private _repository: IChangeNameOrEmailRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    @inject(TYPES.ChangeNameOrEmailRepositoryImpl)
    private readonly repository: IChangeNameOrEmailRepository,
    @inject(TYPES.Validate) private readonly validate,
    @inject(TYPES.DataChecker) private readonly dataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(id: string, name: string, email: string) {
    const instanceUseCase = container.resolve(ChangeNameOrEmailUseCase)

    if (!name) {
      throw customException('Informe o nome de usuário')
    }

    if (instanceUseCase._dataChecker.nameChecker(name) === false) {
      throw customException('O campo de nome só aceita letras')
    }

    const user = await instanceUseCase._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    if (!email) {
      throw customException('Informe o Email do usuário')
    }

    if (instanceUseCase._dataChecker.emailChecker(email) === false) {
      throw customException('Email inválido')
    }

    try {
      const userId = await instanceUseCase._repository.execute(id, name, email)

      return userId
    } catch (error) {
      throw customException('Erro para alterar o nome ou o email')
    }
  }
}

export { ChangeNameOrEmailUseCase }
