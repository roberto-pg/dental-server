import { IChangePlainAndCardRepository } from '../repositories/change_plain_and_card_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangePlainAndCardUseCase {
  private _repository: IChangePlainAndCardRepository
  private _validate: Validate
  constructor(
    readonly repository: IChangePlainAndCardRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, plain: string, card: string) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    if (!plain) {
      throw customException('Informe o nome do convênio')
    }

    if (plain !== 'Particular' && card === '') {
      throw customException('Informe o código do beneficiário')
    }

    try {
      const userId = await this._repository.execute(id, plain, card)

      return userId
    } catch (error) {
      throw customException('Erro na atualização')
    }
  }
}

export { ChangePlainAndCardUseCase }
