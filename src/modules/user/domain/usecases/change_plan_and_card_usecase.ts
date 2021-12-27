import { IChangePlanAndCardRepository } from '../repositories/change_plan_and_card_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangePlanAndCardUseCase {
  private _repository: IChangePlanAndCardRepository
  private _validate: Validate
  constructor(
    readonly repository: IChangePlanAndCardRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, plan: string, card: string) {
    const user = await this._validate.verifyUserId(id)

    if (!user) {
      throw customException('Usuário não encontrado')
    }

    if (!plan) {
      throw customException('Informe o nome do convênio')
    }

    if (plan !== 'Particular' && !card) {
      throw customException('Informe o código do beneficiário')
    }

    if (plan === 'Particular' && card !== '') {
      throw customException('Remova o código do beneficiário')
    }

    try {
      const userId = await this._repository.execute(id, plan, card)

      return userId
    } catch (error) {
      throw customException('Erro na atualização')
    }
  }
}

export { ChangePlanAndCardUseCase }
