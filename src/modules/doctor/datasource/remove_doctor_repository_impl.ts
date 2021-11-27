import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveDoctorRepository } from '../domain/repositories/remove_doctor_repository'
import container from '../../../shared/ioc/inversify_config'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'

@injectable()
class RemoveDoctorRepositoryImpl implements IRemoveDoctorRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const instanceRepository = container.resolve(RemoveDoctorRepositoryImpl)

    const doctor = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.delete({
        where: {
          id: id
        }
      })
    return doctor.id
  }
}

export { RemoveDoctorRepositoryImpl }
