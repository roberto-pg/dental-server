import { ScheduleModel } from '../../../../shared/types'

export interface IListSchedulesRepository {
  execute(): Promise<ScheduleModel[]>
}
