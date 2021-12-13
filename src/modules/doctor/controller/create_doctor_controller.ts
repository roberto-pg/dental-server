import { Request, Response } from 'express'
import { CreateDoctorUseCase } from '../domain/usecases/create_doctor_usecase'
require('dotenv').config()

class CreateDoctorController {
  private _useCase: CreateDoctorUseCase
  constructor(readonly useCase: CreateDoctorUseCase) {
    this._useCase = useCase
    this.handle = this.handle.bind(this)
  }

  async handle(request: Request, response: Response) {
    const imageUrl = process.env.DIR_IMAGE + request.file.filename
    const { name, specialty, bio } = request.body

    try {
      const result = await this._useCase.call(name, specialty, imageUrl, bio)

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { CreateDoctorController }
