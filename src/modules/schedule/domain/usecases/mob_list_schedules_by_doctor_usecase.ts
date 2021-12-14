import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'
import { IMobListSchedulesByDoctorRepository } from '../repositories/mob_list_schedules_by_doctor_repository'

class MobListSchedulesByDoctorUseCase {
  private _repository: IMobListSchedulesByDoctorRepository
  private _validate: Validate
  constructor(
    readonly repository: IMobListSchedulesByDoctorRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(doctorId: string) {
    const doctor = await this._validate.verifyDoctorId(doctorId)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)

      const schedules = await this._repository.execute(doctorId, currentDay)

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

export { MobListSchedulesByDoctorUseCase }
