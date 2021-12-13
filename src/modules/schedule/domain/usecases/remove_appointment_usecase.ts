import { IRemoveAppointmentRepository } from '../repositories/remove_appointment_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class RemoveAppointmentUseCase {
  private _repository: IRemoveAppointmentRepository
  private _validate: Validate
  constructor(
    readonly repository: IRemoveAppointmentRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(
    id: string,
    patientName: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean,
    editable: boolean
  ) {
    if (!id) throw customException('Informe o ID do agendamento')

    if (typeof id !== 'string')
      throw customException('O Id do agendamento deve ser uma string')

    const scheduleId = await this._validate.verifyScheduleId(id)

    if (!scheduleId) throw customException('Agendamento não encontrado')

    try {
      const appointmentId = await this._repository.execute(
        id,
        patientName,
        cpf,
        plain,
        card,
        scheduled,
        editable
      )

      return appointmentId
    } catch (error) {
      throw customException('Falha para cancelar o agendamento')
    }
  }
}

export { RemoveAppointmentUseCase }
