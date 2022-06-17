import { IMobListSchedulesByDoctorRepository } from '../domain/repositories/mob_list_schedules_by_doctor_repository'
import IHttpService from '../../../shared/prisma/http_service'
import { ScheduleModel } from '../../../shared/types/schedule_model'

class MobListSchedulesByDoctorRepositoryImpl
  implements IMobListSchedulesByDoctorRepository
{
  private _prismaServer: IHttpService
  constructor(readonly prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async execute(doctorId: string, currentDay: Date): Promise<ScheduleModel[]> {
    const schedules = await this._prismaServer
      .connectPrisma()
      .schedule.findMany({
        where: {
          doctor_id: doctorId,
          scheduled: false,
          month_day: {
            gte: currentDay.toISOString(),
          },
        },
        orderBy: [
          {
            month_day: 'asc',
          },
          {
            hour: 'asc',
          },
        ],
      })

    return schedules
  }
}

export { MobListSchedulesByDoctorRepositoryImpl }
