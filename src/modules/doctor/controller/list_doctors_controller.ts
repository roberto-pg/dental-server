import { Request, Response } from 'express'
import { ListDoctorsUseCase } from '../domain/usecases/list_doctors_usecase'

class ListDoctorsController {
  private _useCase: ListDoctorsUseCase
  constructor(readonly useCase: ListDoctorsUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    try {
      const result = await this._useCase.call()

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsController }
