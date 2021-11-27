import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateScheduleRepository } from '../repositories/create_schedule_repository'
import { Validate } from '../../../../shared/utils/validate'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

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
class CreateScheduleUseCase {
  private _repository: ICreateScheduleRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.CreateScheduleRepositoryImpl)
    private readonly repository: ICreateScheduleRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
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
    plain: string,
    card: string,
    scheduled: boolean,
    editable: boolean,
    timeToSchedule: []
  ) {
    const instanceUseCase = container.resolve(CreateScheduleUseCase)
    let parsedMonthDay: string

    const newSchedules = timeToSchedule.map((scheduleItem: ScheduleModel) => {
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
        plain: plain,
        card: card,
        scheduled: scheduled,
        editable: editable
      }
    })

    // Filtra o request.body para buscar horários redundantes (que já existem)
    const filteredSchedules =
      await instanceUseCase._validate.schedulesAlreadyExists(
        newSchedules,
        parsedMonthDay,
        doctorId
      )

    // Retira do request.body os horários que já existem no banco de dados
    for (let x = 0; x < filteredSchedules.length; x++) {
      const index = newSchedules.findIndex(
        (val: ScheduleModel) => val.hour === filteredSchedules[x].hour
      )
      if (index >= 0) {
        newSchedules.splice(index, 1)
      }
    }

    try {
      const schedules = await instanceUseCase._repository.execute(newSchedules)

      return schedules
    } catch (error) {
      throw customException('Falha para cadastrar horários')
    }
  }
}

export { CreateScheduleUseCase }
