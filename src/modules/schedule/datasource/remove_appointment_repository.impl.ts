import { IRemoveAppointmentRepository } from '../domain/repositories/remove_appointment_repository'
import IHttpService from '../../../shared/prisma/http_service'

class RemoveAppointmentRepositoryImpl implements IRemoveAppointmentRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    id: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean,
    editable: boolean
  ): Promise<string> {
    const schedule = await this._prismaServer.connectPrisma().schedule.update({
      where: {
        id: id
      },
      data: {
        patient_name: patientName,
        cpf: cpf,
        plan: plan,
        card: card,
        scheduled: scheduled,
        editable: editable
      }
    })

    return schedule.id
  }
}

export { RemoveAppointmentRepositoryImpl }
