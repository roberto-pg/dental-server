import { ScheduleModel } from '../../../../shared/types'

export interface IListAppointmentByCpfRepository {
  execute(cfp: string): Promise<ScheduleModel[]>
}
