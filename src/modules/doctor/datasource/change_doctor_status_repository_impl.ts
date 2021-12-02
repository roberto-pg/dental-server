import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeDoctorStatusRepository } from '../domain/repositories/change_doctor_status_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeDoctorStatusRepositoryImpl
  implements IChangeDoctorStatusRepository
{
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, active: boolean): Promise<string> {
    const instanceRepository = container.resolve(
      ChangeDoctorStatusRepositoryImpl
    )

    const doctor = await instanceRepository._prismaServer
      .connectPrisma()
      .doctor.update({
        where: {
          id
        },
        data: {
          active: active
        }
      })

    return doctor.id
  }
}

export { ChangeDoctorStatusRepositoryImpl }
