import bcrypt from 'bcryptjs'
import { Validate } from '../../../../shared/utils/validate'
import { IChangePasswordRepository } from '../repositories/change_password.repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangePasswordUseCase {
  private _repository: IChangePasswordRepository
  private _validate: Validate
  constructor(readonly repository: IChangePasswordRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, oldPassword: string, newPassword: string) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    if (!oldPassword) {
      throw customException('Informe a senha atual')
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw customException('Senha atual inválida')
    }

    if (!newPassword) {
      throw customException('Informe a nova senha')
    }

    if (String(newPassword).length < 6) {
      throw customException('A nova senha deve ter ao menos 6 caracteres')
    }

    try {
      const password = await bcrypt.hash(newPassword, 10)
      const userId = await this._repository.execute(id, password)

      return userId
    } catch (error) {
      throw customException('Erro ao alterar a senha')
    }
  }
}

export { ChangePasswordUseCase }
