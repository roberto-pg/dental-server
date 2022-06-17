import { ScheduleModel } from '../../../../shared/types'

export interface IListSchedulesByDoctorRepository {
  execute(doctorId: string): Promise<ScheduleModel[]>
}
