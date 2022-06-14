import { IRemoveDoctorRepository } from '../domain/repositories/remove_doctor_repository'
import IHttpService from '../../../shared/prisma/http_service'

class RemoveDoctorRepositoryImpl implements IRemoveDoctorRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<string> {
    const doctor = await this._prismaServer.connectPrisma().doctor.delete({
      where: {
        id: id,
      },
    })
    return doctor.id
  }
}

export { RemoveDoctorRepositoryImpl }
