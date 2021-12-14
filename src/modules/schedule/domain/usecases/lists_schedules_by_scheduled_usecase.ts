import { IListSchedulesByScheduledRepository } from '../repositories/list_schedules_by_scheduled_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ListSchedulesByScheduledUseCase {
  private _repository: IListSchedulesByScheduledRepository
  constructor(readonly repository: IListSchedulesByScheduledRepository) {
    this._repository = repository
  }

  async call(scheduled: string) {
    let scheduledBool: boolean

    if (scheduled === 'true') {
      scheduledBool = true
    } else if (scheduled === 'false') {
      scheduledBool = false
    } else {
      customException('Falha na chamada dos agendamentos')
    }

    try {
      const schedules = await this._repository.execute(scheduledBool)

      const serializedSchedules = schedules.map((schedule) => {
        return {
          id: schedule.id,
          doctorId: schedule.doctor_id,
          doctorName: schedule.doctor_name,
          specialty: schedule.specialty,
          monthDay: schedule.month_day,
          weekDay: schedule.week_day,
          hour: schedule.hour,
          patientName: schedule.patient_name,
          cpf: schedule.cpf,
          plain: schedule.plain,
          card: schedule.card,
          scheduled: schedule.scheduled,
          editable: schedule.editable
        }
      })

      return serializedSchedules
    } catch (error) {
      throw customException('Falha para listar os agendamentos')
    }
  }
}

export { ListSchedulesByScheduledUseCase }
