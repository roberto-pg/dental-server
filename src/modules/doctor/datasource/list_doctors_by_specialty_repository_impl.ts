import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListDoctorsBySpecialtyRepository } from '../domain/repositories/list_doctors_by_specialty_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsBySpecialtyRepositoryImpl
  implements IListDoctorsBySpecialtyRepository
{
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(specialty: string): Promise<
    {
      id: string
      name: string
      specialty: string
      image_url: string
      bio: string
      active: boolean
    }[]
  > {
    const instanceRepository = container.resolve(
      ListDoctorsBySpecialtyRepositoryImpl
    )

    const doctors = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.findMany({
        where: {
          specialty: specialty
        }
      })

    return doctors
  }
}

export { ListDoctorsBySpecialtyRepositoryImpl }
