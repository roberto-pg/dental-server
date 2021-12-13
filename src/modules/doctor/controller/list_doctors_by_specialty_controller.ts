import { Request, Response } from 'express'
import { ListDoctorsBySpecialtyUseCase } from '../domain/usecases/list_doctors_by_specialty_usecase'

class ListDoctorsBySpecialtyController {
  private _useCase: ListDoctorsBySpecialtyUseCase
  constructor(readonly useCase: ListDoctorsBySpecialtyUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const { specialty } = request.params
    try {
      const result = await this._useCase.call(specialty)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { ListDoctorsBySpecialtyController }
