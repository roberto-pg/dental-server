import { ICreateDoctorRepository } from '../domain/repositories/create_doctor_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { DoctorModel } from '../../../shared/types/doctor_model'

class CreateDoctorRepositoryImpl implements ICreateDoctorRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    name: string,
    specialty: string,
    image_url: string,
    bio: string
  ): Promise<DoctorModel> {
    const doctor = await this._prismaServer.connectPrisma().doctor.create({
      data: {
        name,
        specialty,
        image_url,
        bio,
      },
    })

    return doctor
  }
}

export { CreateDoctorRepositoryImpl }
