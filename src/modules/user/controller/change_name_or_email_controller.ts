import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangeNameOrEmailUseCase } from '../domain/usecases/change_name_or_email_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeNameOrEmailController {
  private _useCase: ChangeNameOrEmailUseCase
  constructor(
    @inject(TYPES.ChangeNameOrEmailUseCase)
    private readonly useCase: ChangeNameOrEmailUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, name, email } = request.body
    const instanceController = container.resolve(ChangeNameOrEmailController)

    try {
      const result = await instanceController._useCase.call(id, name, email)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeNameOrEmailController }
