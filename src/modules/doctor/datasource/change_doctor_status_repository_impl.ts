import { IChangeDoctorStatusRepository } from '../domain/repositories/change_doctor_status_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeDoctorStatusRepositoryImpl
  implements IChangeDoctorStatusRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, active: boolean): Promise<string> {
    const doctor = await this._prismaServer.connectPrisma().doctor.update({
      where: {
        id,
      },
      data: {
        active: active,
      },
    })

    return doctor.id
  }
}

export { ChangeDoctorStatusRepositoryImpl }
