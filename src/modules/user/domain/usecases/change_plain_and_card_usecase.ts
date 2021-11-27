import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { IChangePlainAndCardRepository } from '../repositories/change_plain_and_card_repository'
import { Validate } from '../../../../shared/utils/validate'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ChangePlainAndCardUseCase {
  private _repository: IChangePlainAndCardRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ChangePlainAndCardRepositoryImpl)
    private readonly repository: IChangePlainAndCardRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, plain: string, card: string) {
    const instanceUseCase = container.resolve(ChangePlainAndCardUseCase)

    const user = await instanceUseCase._validate.verifyUserId(id)

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
      const userId = await instanceUseCase._repository.execute(id, plain, card)

      return userId
    } catch (error) {
      throw customException('Erro na atualização')
    }
  }
}

export { ChangePlainAndCardUseCase }
