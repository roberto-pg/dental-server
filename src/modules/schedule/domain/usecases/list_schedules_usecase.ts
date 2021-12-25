import { IListSchedulesRepository } from '../repositories/list_schedules_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ListSchedulesUseCase {
  private _repository: IListSchedulesRepository
  constructor(readonly repository: IListSchedulesRepository) {
    this._repository = repository
  }

  async call() {
    try {
      const schedules = await this._repository.execute()

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
          plan: schedule.plan,
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

export { ListSchedulesUseCase }
