import { IListDoctorsRepository } from '../domain/repositories/list_doctors_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListDoctorsRepositoryImpl implements IListDoctorsRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<
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
      orderBy: {
        active: 'desc'
      }
    })

    return doctors
  }
}

export { ListDoctorsRepositoryImpl }
