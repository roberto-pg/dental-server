import { IListDoctorsByIdRepository } from '../domain/repositories/list_doctors_by_id_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ListDoctorsByIdRepositoryImpl implements IListDoctorsByIdRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<{
    id: string
    name: string
    specialty: string
    image_url: string
    bio: string
    active: boolean
  }> {
    const doctor = await this._prismaServer.connectPrisma().doctor.findUnique({
      where: {
        id: id
      }
    })

    return doctor
  }
}

export { ListDoctorsByIdRepositoryImpl }
