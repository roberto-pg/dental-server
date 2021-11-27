import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangePlainAndCardUseCase } from '../domain/usecases/change_plain_and_card_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangePlainAndCardController {
  private _useCase: ChangePlainAndCardUseCase
  constructor(
    @inject(TYPES.ChangePlainAndCardUseCase) private readonly useCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, plain, card } = request.body

    try {
      const instanceController = container.resolve(ChangePlainAndCardController)

      const result = await instanceController._useCase.call(id, plain, card)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangePlainAndCardController }
