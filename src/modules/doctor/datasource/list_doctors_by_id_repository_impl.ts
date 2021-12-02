import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListDoctorsByIdRepository } from '../domain/repositories/list_doctors_by_id_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsByIdRepositoryImpl implements IListDoctorsByIdRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
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
    const instanceRepository = container.resolve(ListDoctorsByIdRepositoryImpl)

    const doctor = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.findUnique({
        where: {
          id: id
        }
      })

    return doctor
  }
}

export { ListDoctorsByIdRepositoryImpl }
