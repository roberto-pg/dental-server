import { IListAppointmentByCpfRepository } from '../repositories/list_appointment_by_cpf_repository'
import { customException } from '../../../../shared/errors/custom_exception'
import { DataChecker } from '../../../../shared/utils/data_checker'

class ListAppointmentByCpfUseCase {
  private _repository: IListAppointmentByCpfRepository
  private _dataChecker: DataChecker
  constructor(
    readonly repository: IListAppointmentByCpfRepository,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._dataChecker = dataChecker
  }

  async call(cpf: string) {
    if (!cpf) {
      throw customException('Informe o CPF')
    }

    const validCpf = await this._dataChecker.cpfChecker(cpf)

    if (!validCpf) {
      throw customException('Cpf inválido')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)

      const appointments = await this._repository.execute(cpf, currentDay)

      const serializedAppointments = appointments.map((appointment) => {
        return {
          id: appointment.id,
          doctorId: appointment.doctor_id,
          doctorName: appointment.doctor_name,
          specialty: appointment.specialty,
          monthDay: appointment.month_day,
          weekDay: appointment.week_day,
          hour: appointment.hour,
          patientName: appointment.patient_name,
          cpf: appointment.cpf,
          plan: appointment.plan,
          card: appointment.card,
          scheduled: appointment.scheduled,
          editable: appointment.editable
        }
      })

      return serializedAppointments
    } catch (error) {
      throw customException('Falha para buscar os agendamentos')
    }
  }
}

export { ListAppointmentByCpfUseCase }
