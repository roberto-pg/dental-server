import { IListDoctorByIdRepository } from '../domain/repositories/list_doctor_by_id_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { DoctorModel } from '../../../shared/types/doctor_model'

class ListDoctorByIdRepositoryImpl implements IListDoctorByIdRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string): Promise<DoctorModel | null> {
    const doctor = await this._prismaServer.connectPrisma().doctor.findUnique({
      where: {
        id: id,
      },
    })

    return doctor
  }
}

export { ListDoctorByIdRepositoryImpl }
