import { Request, Response } from 'express'
import { CreateUserUseCase } from '../domain/usecases/create_user_usecase'

export default class CreateUserController {
  private _useCase: CreateUserUseCase
  constructor(useCase: CreateUserUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { name, email, cpf, password, card, plan, active, admin } =
      request.body

    try {
      const result = await this._useCase.call(
        name,
        email,
        cpf,
        password,
        card,
        plan,
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
