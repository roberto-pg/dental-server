import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListSchedulesByDoctorRepository } from '../repositories/list_schedules_by_doctor_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'

type ScheduleModel = {
  id?: string
  doctor_id: string
  doctor_name: string
  specialty: string
  month_day: string
  week_day: string
  hour: string
  patient_name?: string
  cpf?: string
  plain?: string
  scheduled: boolean
  card?: string
  editable: boolean
}

@injectable()
class ListSchedulesByDoctorUseCase {
  private _repository: IListSchedulesByDoctorRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ListSchedulesByDoctorRepositoryImpl)
    private readonly repository: IListSchedulesByDoctorRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(doctorId: string, yearAndMonth: string) {
    const instanceUseCase = container.resolve(ListSchedulesByDoctorUseCase)

    const doctor = await instanceUseCase._validate.verifyDoctorId(doctorId)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)
      const filteredSchedules = []

      const schedules = await instanceUseCase._repository.execute(
        doctorId,
        currentDay
      )

      schedules.map((doctorSchedule: ScheduleModel) => {
        const formattedDate = doctorSchedule.month_day.substring(0, 7)

        if (formattedDate === yearAndMonth) {
          filteredSchedules.push({
            id: doctorSchedule.id,
            doctorId: doctorSchedule.doctor_id,
            doctorName: doctorSchedule.doctor_name,
            specialty: doctorSchedule.specialty,
            monthDay: doctorSchedule.month_day,
            weekDay: doctorSchedule.week_day,
            hour: doctorSchedule.hour,
            patientName: doctorSchedule.patient_name,
            cpf: doctorSchedule.cpf,
            plain: doctorSchedule.plain,
            card: doctorSchedule.card,
            scheduled: doctorSchedule.scheduled,
            editable: doctorSchedule.editable
          })
        }
        return filteredSchedules
      })
      if (filteredSchedules.length <= 0) {
        throw customException('Não há agendamentos para listar')
      }

      return filteredSchedules
    } catch (error) {
      throw customException('Falha para listar os agendamentos')
    }
  }
}

export { ListSchedulesByDoctorUseCase }
