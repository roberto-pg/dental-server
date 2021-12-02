import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'
import { IMobListSchedulesByDoctorRepository } from '../repositories/mob_list_schedules_by_doctor_repository'

@injectable()
class MobListSchedulesByDoctorUseCase {
  private _repository: IMobListSchedulesByDoctorRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.MobListSchedulesByDoctorRepositoryImpl)
    private readonly repository: IMobListSchedulesByDoctorRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(doctorId: string) {
    const instanceUseCase = container.resolve(MobListSchedulesByDoctorUseCase)

    const doctor = await instanceUseCase._validate.verifyDoctorId(doctorId)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)

      const schedules = await instanceUseCase._repository.execute(
        doctorId,
        currentDay
      )

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
