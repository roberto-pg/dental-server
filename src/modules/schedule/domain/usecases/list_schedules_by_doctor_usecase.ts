import { IListSchedulesByDoctorRepository } from '../repositories/list_schedules_by_doctor_repository'
import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'
import { FilteredScheduleModel, ScheduleModel } from '../../../../shared/types'

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
      const filteredSchedules: FilteredScheduleModel[] = []

      const schedules = await this._repository.execute(doctorId)

      schedules.map((doctorSchedule: ScheduleModel) => {
        const formattedDate = doctorSchedule.month_day?.substring(0, 7)

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
            plan: doctorSchedule.plan,
            card: doctorSchedule.card,
            scheduled: doctorSchedule.scheduled,
            editable: doctorSchedule.editable,
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
