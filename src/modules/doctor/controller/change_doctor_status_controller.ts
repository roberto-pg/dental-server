import { Request, Response } from 'express'
import { ChangeDoctorStatusUseCase } from '../domain/usecases/change_doctor_status_usecase'

class ChangeDoctorStatusController {
  private _useCase: ChangeDoctorStatusUseCase
  constructor(readonly useCase: ChangeDoctorStatusUseCase) {
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

export { ChangeDoctorStatusController }
