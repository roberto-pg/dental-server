import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { customException } from '../../../../shared/errors/custom_exception'
import { IAuthenticateUserRepository } from '../repositories/authenticate_user_repository'
import { setUserCache } from '../../../../shared/redis/redis_service'
import { Validate } from '../../../../shared/utils/validate'
import { DataChecker } from '../../../../shared/utils/data_checker'

class AuthenticateUserUseCase {
  private _repository: IAuthenticateUserRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    readonly repository: IAuthenticateUserRepository,
    readonly validate: Validate,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(cpf: string, password: string) {
    if (this._dataChecker.cpfChecker(cpf) === false) {
      throw customException('CPF inválido')
    }

    const cpfExists = await this._validate.verifyUserCpf(cpf)

    if (!cpfExists) {
      throw customException('CPF não cadastrado')
    }

    const user = await this._repository.execute(cpf)

    if (!(await bcrypt.compare(password, user.password))) {
      throw customException('Senha inválida')
    }

    const token = sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.LOGIN_EXPIRATION_TIME),
    })

    setUserCache(user.id)

    const serializedUser = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      plan: user.plan,
      card: user.card,
      token: token,
    }

    return serializedUser
  }
}

export { AuthenticateUserUseCase }
