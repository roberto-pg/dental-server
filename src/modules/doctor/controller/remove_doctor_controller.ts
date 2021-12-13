import { Request, Response } from 'express'
import { RemoveDoctorUseCase } from '../domain/usecases/remove_doctor_usecase'

class RemoveDoctorController {
  private _useCase: RemoveDoctorUseCase
  constructor(readonly useCase: RemoveDoctorUseCase) {
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

export { RemoveDoctorController }
