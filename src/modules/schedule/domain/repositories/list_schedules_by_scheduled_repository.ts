import { ScheduleModel } from '../../../../shared/types'

export interface IListSchedulesByScheduledRepository {
  execute(scheduled: boolean): Promise<ScheduleModel[]>
}
