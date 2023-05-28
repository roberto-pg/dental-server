import { IListSchedulesByDoctorRepository } from '../domain/repositories/list_schedules_by_doctor_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel } from '../../../shared/types/schedule_model'

class ListSchedulesByDoctorRepositoryImpl implements IListSchedulesByDoctorRepository {
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  // async execute(doctorId: string, currentDay: Date): Promise<ScheduleModel[]> {
  async execute(doctorId: string): Promise<ScheduleModel[]> {
    const schedules = await this._prismaServer.connectPrisma().schedule.findMany({
      where: {
        doctor_id: doctorId
      },
      orderBy: [
        {
          month_day: 'asc'
        },
        {
          hour: 'asc'
        }
      ]
    })

    return schedules
  }
}

export { ListSchedulesByDoctorRepositoryImpl }
