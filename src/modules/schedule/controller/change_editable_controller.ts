import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangeEditableUseCase } from '../domain/usecases/change_editable_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeEditableController {
  private _useCase: ChangeEditableUseCase
  constructor(
    @inject(TYPES.ChangeEditableUseCase)
    private readonly useCase: ChangeEditableUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, editable } = request.body
    const instanceController = container.resolve(ChangeEditableController)

    try {
      const result = await instanceController._useCase.call(id, editable)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeEditableController }
