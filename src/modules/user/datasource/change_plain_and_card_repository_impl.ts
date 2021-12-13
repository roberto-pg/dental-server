import { IChangePlainAndCardRepository } from '../domain/repositories/change_plain_and_card_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangePlainAndCardRepositoryImpl
  implements IChangePlainAndCardRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, plain: string, card: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
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
