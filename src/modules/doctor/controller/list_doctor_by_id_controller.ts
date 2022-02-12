import { Request, Response } from 'express'
import { ListDoctorByIdUseCase } from '../domain/usecases/list_doctor_by_id_usecase'

class ListDoctorByIdController {
  private _useCase: ListDoctorByIdUseCase
  constructor(readonly useCase: ListDoctorByIdUseCase) {
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

export { ListDoctorByIdController }
