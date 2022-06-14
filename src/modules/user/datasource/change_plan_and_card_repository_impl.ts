import { IChangePlanAndCardRepository } from '../domain/repositories/change_plan_and_card_repository'
import IHttpService from '../../../shared/prisma/http_service'

class ChangePlanAndCardRepositoryImpl implements IChangePlanAndCardRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(id: string, plan: string, card: string): Promise<string> {
    const user = await this._prismaServer.connectPrisma().user.update({
      where: {
        id,
      },
      data: {
        plan: plan,
        card: card,
      },
    })

    return user.id
  }
}

export { ChangePlanAndCardRepositoryImpl }
