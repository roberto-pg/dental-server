import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IRemoveAppointmentRepository } from '../repositories/remove_appointment_repository'
import { Validate } from '../../../../shared/utils/validate'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class RemoveAppointmentUseCase {
  private _repository: IRemoveAppointmentRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.RemoveAppointmentRepositoryImpl)
    private readonly repository: IRemoveAppointmentRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
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
    const instanceUseCase = container.resolve(RemoveAppointmentUseCase)

    if (!id) throw customException('Informe o ID do agendamento')

    if (typeof id !== 'string')
      throw customException('O Id do agendamento deve ser uma string')

    const scheduleId = await instanceUseCase._validate.verifyScheduleId(id)

    if (!scheduleId) throw customException('Agendamento não encontrado')

    try {
      const appointmentId = await instanceUseCase._repository.execute(
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
