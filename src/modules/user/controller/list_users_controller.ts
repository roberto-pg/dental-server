import { Request, Response } from 'express'
import { UserModel } from '../../../shared/types'
import { ListUsersUseCase } from '../domain/usecases/list_users_usecase'

class ListUsersController {
  private _useCase: ListUsersUseCase
  constructor(readonly useCase: ListUsersUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    try {
      const result = await this._useCase.call()

      const filteredResult = result.map((user: UserModel) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          card: user.card,
          plan: user.plan,
          active: user.active,
          admin: user.admin,
        }
      })

      return response.json(filteredResult)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListUsersController }
