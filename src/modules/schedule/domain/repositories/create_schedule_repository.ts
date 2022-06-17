import { ScheduleModel2 } from '../../../../shared/types'

export interface ICreateScheduleRepository {
  execute(newSchedules: ScheduleModel2[]): Promise<string>
}
