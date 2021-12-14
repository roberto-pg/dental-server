import { IListSchedulesByDoctorRepository } from '../repositories/list_schedules_by_doctor_repository'
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

class ListSchedulesByDoctorUseCase {
  private _repository: IListSchedulesByDoctorRepository
  private _validate: Validate
  constructor(
    readonly repository: IListSchedulesByDoctorRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(doctorId: string, yearAndMonth: string) {
    const doctor = await this._validate.verifyDoctorId(doctorId)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)
      const filteredSchedules = []

      const schedules = await this._repository.execute(doctorId, currentDay)

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
