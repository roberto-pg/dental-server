import { ScheduleModel } from '../../../../shared/types'

export interface IMobListSchedulesByDoctorRepository {
  execute(doctorId: string, currentDay: Date): Promise<ScheduleModel[]>
}
