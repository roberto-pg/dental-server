import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { CreateDoctorUseCase } from '../domain/usecases/create_doctor_usecase'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'
require('dotenv').config()

@injectable()
class CreateDoctorController {
  private _useCase: CreateDoctorUseCase
  constructor(
    @inject(TYPES.CreateDoctorUseCase)
    private readonly useCase: CreateDoctorUseCase
  ) {
    this._useCase = useCase
  }

  async handle(request: Request, response: Response) {
    const imageUrl = process.env.DIR_IMAGE + request.file.filename
    const { name, specialty, bio } = request.body
    const instanceController = container.resolve(CreateDoctorController)

    try {
      const result = await instanceController._useCase.call(
        name,
        specialty,
        imageUrl,
        bio
      )

      return response.json(result)
    } catch (error) {
      return response.status(400).json({ Error: error.message })
    }
  }
}

export { CreateDoctorController }
