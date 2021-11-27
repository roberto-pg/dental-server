import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeEditableRepository } from '../domain/repositories/change_editable_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'
import container from '../../../shared/ioc/inversify_config'

@injectable()
class ChangeEditableRepositoryImpl implements IChangeEditableRepository {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, editable: boolean): Promise<string> {
    const instanceRepository = container.resolve(ChangeEditableRepositoryImpl)

    const appointment = await instanceRepository._prismaServer
      .connectPrisma()
      .schedule.update({
        where: {
          id: id
        },
        data: {
          editable: editable
        }
      })

    return appointment.id
  }
}

export { ChangeEditableRepositoryImpl }
