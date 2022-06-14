import { IChangeEditableRepository } from '../domain/repositories/change_editable_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangeEditableRepositoryImpl implements IChangeEditableRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, editable: boolean): Promise<string> {
    const appointment = await this._prismaServer
      .connectPrisma()
      .schedule.update({
        where: {
          id: id,
        },
        data: {
          editable: editable,
        },
      })

    return appointment.id
  }
}

export { ChangeEditableRepositoryImpl }
