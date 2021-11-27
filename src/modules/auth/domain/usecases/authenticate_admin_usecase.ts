import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'
import { setUserCache } from '../../../../shared/redis/redis_service'
import { IAuthenticateAdminRepository } from '../repositories/authenticate_admin_repository'

@injectable()
class AuthenticateAdminUseCase {
  private _repository: IAuthenticateAdminRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    @inject(TYPES.AuthenticateAdminRepositoryImpl)
    private readonly repository: IAuthenticateAdminRepository,
    @inject(TYPES.Validate) private readonly validate: Validate,
    @inject(TYPES.DataChecker) private readonly dataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(cpf: string, password: string) {
    const instanceUseCase = container.resolve(AuthenticateAdminUseCase)

    if (instanceUseCase._dataChecker.cpfChecker(cpf) === false) {
      throw customException('Cpf inválido')
    }

    const cpfExists = await instanceUseCase._validate.verifyUserCpf(cpf)

    if (!cpfExists) {
      throw customException('CPF não cadastrado')
    }

    const user = await instanceUseCase._repository.execute(cpf)

    if (!user.admin) {
      throw customException('Acesso permitido somente para administradores')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw customException('Senha inválida')
    }

    const token = sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.LOGIN_EXPIRATION_TIME)
    })

    setUserCache(user.id)

    const serializedUser = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      token: token
    }

    return serializedUser
  }
}

export { AuthenticateAdminUseCase }
