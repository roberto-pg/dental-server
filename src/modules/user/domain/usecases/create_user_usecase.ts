import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import bcrypt from 'bcryptjs'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'
import { TYPES } from '../../../../shared/ioc/types'
import { ICreateUserRepository } from '../repositories/create_user_repository'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'

@injectable()
class CreateUserUseCase {
  private _repository: ICreateUserRepository
  private _dataChecker: DataChecker
  private _validate: Validate
  constructor(
    @inject(TYPES.CreateUserRepositoryImpl)
    private readonly repository: ICreateUserRepository,
    @inject(TYPES.DataChecker) private dataChecker: DataChecker,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._dataChecker = dataChecker
    this._validate = validate
  }

  async call(
    name: string,
    email: string,
    cpf: string,
    password: string,
    card: string,
    plain: string,
    active: boolean,
    admin: boolean
  ) {
    const instanceUseCase = container.resolve(CreateUserUseCase)

    if (!name) {
      throw customException('Informe o nome de usuário')
    }

    if (instanceUseCase._dataChecker.nameChecker(name) === false) {
      throw customException('O campo de nome só aceita letras')
    }

    if (instanceUseCase._dataChecker.emailChecker(email) === false) {
      throw customException('Email inválido')
    }

    const emailExists = await instanceUseCase._validate.verifyUserEmail(email)

    if (emailExists != null) {
      throw customException('O email já existe')
    }

    if (instanceUseCase._dataChecker.cpfChecker(cpf) === false) {
      throw customException('Cpf inválido')
    }

    const cpfExists = await instanceUseCase._validate.verifyUserCpf(cpf)

    if (cpfExists) {
      throw customException('O CPF já existe')
    }

    if (password.length < 6) {
      throw customException('A senha deve ter ao menos 6 caracteres')
    }

    if (plain === '' || plain === 'Nome do convênio') {
      throw customException('Informe o nome do convênio')
    }

    if (plain === 'Particular' && card !== '')
      customException('Paciente particular não usa código de beneficiário')

    if (plain !== 'Particular' && card === '') {
      throw customException('Informe o código do beneficiário')
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = await instanceUseCase._repository.execute(
        name,
        email,
        cpf,
        hashPassword,
        card,
        plain,
        active,
        admin
      )
      return user
    } catch (error) {
      throw customException('Erro ao criar usuário')
    }
  }
}

export { CreateUserUseCase }
