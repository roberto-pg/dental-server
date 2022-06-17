import { ICreateScheduleRepository } from '../repositories/create_schedule_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
import { ScheduleModel2 } from '../../../../shared/types'

class CreateScheduleUseCase {
  private _repository: ICreateScheduleRepository
  private _validate: Validate
  constructor(
    readonly repository: ICreateScheduleRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(
    doctorId: string,
    doctorName: string,
    specialty: string,
    monthDay: string,
    weekDay: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean,
    editable: boolean,
    timeToSchedule: []
  ) {
    const activeDoctor = await this._validate.doctorIsActive(doctorId)

    if (!activeDoctor) {
      customException('A agenda está desativada')
    }

    let parsedMonthDay = ''

    const newSchedules = timeToSchedule.map((scheduleItem: ScheduleModel2) => {
      parsedMonthDay = `${monthDay}T00:00:00-03:00`

      return {
        doctor_id: doctorId,
        doctor_name: doctorName,
        specialty: specialty,
        month_day: parsedMonthDay,
        week_day: weekDay,
        hour: scheduleItem.hour,
        patient_name: patientName,
        cpf: cpf,
        plan: plan,
        card: card,
        scheduled: scheduled,
        editable: editable,
      }
    })

    // Filtra o request.body para buscar horários redundantes (que já existem)
    const filteredSchedules = await this._validate.schedulesAlreadyExists(
      newSchedules,
      parsedMonthDay,
      doctorId
    )

    // Retira do request.body os horários que já existem no banco de dados
    for (let x = 0; x < filteredSchedules.length; x++) {
      const index = newSchedules.findIndex(
        (val: ScheduleModel2) => val.hour === filteredSchedules[x].hour
      )
      if (index >= 0) {
        newSchedules.splice(index, 1)
      }
    }

    try {
      const schedules = await this._repository.execute(newSchedules)

      return schedules
    } catch (error) {
      throw customException('Falha para cadastrar horários')
    }
  }
}

export { CreateScheduleUseCase }
