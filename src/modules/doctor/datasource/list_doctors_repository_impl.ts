import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListDoctorsRepository } from '../domain/repositories/list_doctors_repository'
import { TYPES } from '../../../shared/ioc/types'
import IHttpService from '../../../shared/prisma/http_service'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ListDoctorsRepositoryImpl implements IListDoctorsRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<
    { name: string; specialty: string; image_url: string; bio: string }[]
  > {
    const instanceRepository = container.resolve(ListDoctorsRepositoryImpl)

    const doctors = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.findMany()

    return doctors
  }
}

export { ListDoctorsRepositoryImpl }
