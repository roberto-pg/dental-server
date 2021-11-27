import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { ChangePasswordUseCase } from '../domain/usecases/change_password_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangePasswordController {
  private _useCase: ChangePasswordUseCase
  constructor(
    @inject(TYPES.ChangePasswordUseCase)
    private readonly useCase: ChangePasswordUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { id, oldPassword, newPassword } = request.body

    try {
      const instanceController = container.resolve(ChangePasswordController)

      const result = await instanceController._useCase.call(
        id,
        oldPassword,
        newPassword
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangePasswordController }
