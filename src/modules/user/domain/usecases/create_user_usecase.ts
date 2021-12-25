import bcrypt from 'bcryptjs'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'
import { Validate } from '../../../../shared/utils/validate'
import { ICreateUserRepository } from '../repositories/create_user_repository'

class CreateUserUseCase {
  private _repository: ICreateUserRepository
  private _dataChecker: DataChecker
  private _validate: Validate
  constructor(
    readonly repository: ICreateUserRepository,
    readonly dataChecker: DataChecker,
    readonly validate: Validate
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
    plan: string,
    active: boolean,
    admin: boolean
  ) {
    if (!name) {
      throw customException('Informe o nome de usuário')
    }

    if (this._dataChecker.nameChecker(name) === false) {
      throw customException('O campo de nome só aceita letras')
    }

    if (this._dataChecker.emailChecker(email) === false) {
      throw customException('Email inválido')
    }

    const emailExists = await this._validate.verifyUserEmail(email)

    if (emailExists != null) {
      throw customException('O email já existe')
    }

    if (this._dataChecker.cpfChecker(cpf) === false) {
      throw customException('CPF inválido')
    }

    const cpfExists = await this._validate.verifyUserCpf(cpf)

    if (cpfExists) {
      throw customException('O CPF já existe')
    }

    if (password.length < 6) {
      throw customException('A senha deve ter ao menos 6 caracteres')
    }

    if (plan === '' || plan === 'Nome do convênio') {
      throw customException('Informe o nome do convênio')
    }

    if (plan === 'Particular' && card !== '')
      customException('Paciente particular não usa código de beneficiário')

    if (plan !== 'Particular' && card === '') {
      throw customException('Informe o código do beneficiário')
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = await this._repository.execute(
        name,
        email,
        cpf,
        hashPassword,
        card,
        plan,
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
