import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListSchedulesRepository } from '../repositories/list_schedules_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListSchedulesUseCase {
  private _repository: IListSchedulesRepository
  constructor(
    @inject(TYPES.ListSchedulesRepositoryImpl)
    private readonly repository: IListSchedulesRepository
  ) {
    this._repository = repository
  }

  async call() {
    const instanceUseCase = container.resolve(ListSchedulesUseCase)

    try {
      const schedules = await instanceUseCase._repository.execute()

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

export { ListSchedulesUseCase }
