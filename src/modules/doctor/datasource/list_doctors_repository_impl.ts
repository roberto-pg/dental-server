import { IListDoctorsRepository } from '../domain/repositories/list_doctors_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { DoctorModel } from '../../../shared/types/doctor_model'

class ListDoctorsRepositoryImpl implements IListDoctorsRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(): Promise<DoctorModel[]> {
    const doctors = await this._prismaServer.connectPrisma().doctor.findMany({
      orderBy: {
        active: 'desc',
      },
    })

    return doctors
  }
}

export { ListDoctorsRepositoryImpl }
