import { Request, Response } from 'express'
import { ChangeStatusUseCase } from '../domain/usecases/change_status_usecase'

class ChangeStatusController {
  private _useCase: ChangeStatusUseCase
  constructor(readonly useCase: ChangeStatusUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id, active } = request.body

    try {
      const result = await this._useCase.call(id, active)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ChangeStatusController }
