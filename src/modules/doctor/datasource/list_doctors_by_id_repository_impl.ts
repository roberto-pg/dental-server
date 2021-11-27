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

  async execute(
    id: string
  ): Promise<
    { name: string; specialty: string; image_url: string; bio: string }[]
  > {
    const instanceRepository = container.resolve(ListDoctorsByIdRepositoryImpl)

    const doctors = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.findMany({
        where: {
          id: id
        }
      })

    return doctors
  }
}

export { ListDoctorsByIdRepositoryImpl }
