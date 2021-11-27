import 'reflect-metadata'
import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../domain/usecases/create_user_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
export default class CreateUserController {
  private _useCase: CreateUserUseCase
  constructor(
    @inject(TYPES.CreateUserUseCase) private readonly useCase: CreateUserUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const { name, email, cpf, password, card, plain, active, admin } =
      request.body
    const instanceController = container.resolve(CreateUserController)

    try {
      const result = await instanceController._useCase.call(
        name,
        email,
        cpf,
        password,
        card,
        plain,
        active,
        admin
      )
      result.password = undefined
      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}
