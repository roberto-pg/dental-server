import { IListDoctorsBySpecialtyRepository } from '../domain/repositories/list_doctors_by_specialty_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListDoctorsBySpecialtyRepositoryImpl
  implements IListDoctorsBySpecialtyRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
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
    const doctors = await this._prismaServer.connectPrisma().doctor.findMany({
      where: {
        specialty: specialty,
      },
    })

    return doctors
  }
}

export { ListDoctorsBySpecialtyRepositoryImpl }
