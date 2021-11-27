import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangePlainAndCardRepository } from '../domain/repositories/change_plain_and_card_repository'
import container from '../../../shared/ioc/inversify_config'
import IHttpService from '../../../shared/prisma/http_service'
import { TYPES } from '../../../shared/ioc/types'

@injectable()
class ChangePlainAndCardRepositoryImpl
  implements IChangePlainAndCardRepository
{
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, plain: string, card: string): Promise<string> {
    const instanceRepository = container.resolve(
      ChangePlainAndCardRepositoryImpl
    )

    const user = await instanceRepository._prismaServer
      .connectPrisma()
      .user.update({
        where: {
          id
        },
        data: {
          plain: plain,
          card: card
        }
      })

    return user.id
  }
}

export { ChangePlainAndCardRepositoryImpl }
