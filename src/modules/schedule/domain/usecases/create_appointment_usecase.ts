import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { ICreateAppointmentRepository } from '../repositories/create_appointment_repository'
import { Validate } from '../../../../shared/utils/validate'
import { DataChecker } from '../../../../shared/utils/data_checker'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class CreateAppointmentUseCase {
  private _repository: ICreateAppointmentRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    @inject(TYPES.CreateAppointmentRepositoryImpl)
    private readonly repository: ICreateAppointmentRepository,
    @inject(TYPES.Validate) private readonly validate: Validate,
    @inject(TYPES.DataChecker) private readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(
    id: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean
  ) {
    const instanceUseCase = container.resolve(CreateAppointmentUseCase)

    if (!id) throw customException('Informe o ID do agendamento')

    const appointmentId = await instanceUseCase._validate.verifyAppointmentId(
      id,
      scheduled
    )

    if (!appointmentId) throw customException('Agendamento não disponível')

    if (!cpf) throw customException('Informe o CPF do beneficiário')

    const validCpf = instanceUseCase._dataChecker.cpfChecker(cpf)

    if (!validCpf) throw customException('Cpf inválido')

    const userCpf = await instanceUseCase._validate.verifyUserCpf(cpf)

    if (!userCpf) throw customException('Cpf não cadastrado')

    if (!plain) throw customException('Informe o convênio do beneficiário')

    if (plain !== 'Particular' && !card)
      throw customException('Informe o código do beneficiário')

    if (plain === 'Particular' && card !== '')
      customException('Paciente particular não usa código de beneficiário')

    try {
      const appointments = await instanceUseCase._repository.execute(
        id,
        cpf,
        plain,
        card,
        scheduled
      )

      return appointments
    } catch (error) {
      throw customException('Falha para buscar os agendamentos')
    }
  }
}

export { CreateAppointmentUseCase }
