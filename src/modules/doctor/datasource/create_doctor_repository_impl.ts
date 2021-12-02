import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateDoctorRepository } from '../domain/repositories/create_doctor_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class CreateDoctorRepositoryImpl implements ICreateDoctorRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(
    name: string,
    specialty: string,
    image_url: string,
    bio: string
  ): Promise<{
    id: string
    name: string
    specialty: string
    image_url: string
    bio: string
  }> {
    const instanceRepository = container.resolve(CreateDoctorRepositoryImpl)

    const doctor = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.create({
        data: {
          name,
          specialty,
          image_url,
          bio
        }
      })

    return doctor
  }
}

export { CreateDoctorRepositoryImpl }
