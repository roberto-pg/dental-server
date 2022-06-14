import { ICreateAppointmentRepository } from '../domain/repositories/create_appointment_repository'
import IHttpService from '../../../shared/prisma/http_service'

class CreateAppointmentRepositoryImpl implements ICreateAppointmentRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(
    scheduleId: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean
  ): Promise<string> {
    const appointment = await this._prismaServer
      .connectPrisma()
      .schedule.update({
        where: {
          id: scheduleId,
        },
        data: {
          patient_name: patientName,
          cpf: cpf,
          plan: plan,
          card: card,
          scheduled: scheduled,
          editable: false,
        },
      })

    return appointment.id
  }
}

export { CreateAppointmentRepositoryImpl }
