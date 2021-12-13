import { Request, Response } from 'express'
import { ListDoctorsByIdUseCase } from '../domain/usecases/list_doctors_by_id_usecase'

class ListDoctorsByIdController {
  private _useCase: ListDoctorsByIdUseCase
  constructor(readonly useCase: ListDoctorsByIdUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { id } = request.params
    try {
      const result = await this._useCase.call(id)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsByIdController }
