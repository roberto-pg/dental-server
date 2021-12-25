import { ICreateAppointmentRepository } from '../repositories/create_appointment_repository'
import { Validate } from '../../../../shared/utils/validate'
import { DataChecker } from '../../../../shared/utils/data_checker'
import { customException } from '../../../../shared/errors/custom_exception'

class CreateAppointmentUseCase {
  private _repository: ICreateAppointmentRepository
  private _validate: Validate
  private _dataChecker: DataChecker
  constructor(
    readonly repository: ICreateAppointmentRepository,
    readonly validate: Validate,
    readonly dataChecker: DataChecker
  ) {
    this._repository = repository
    this._validate = validate
    this._dataChecker = dataChecker
  }

  async call(
    id: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean
  ) {
    if (!id) throw customException('Informe o ID do agendamento')

    const appointmentId = await this._validate.verifyAppointmentId(id)

    if (!appointmentId) throw customException('Agendamento não disponível')

    if (!cpf) throw customException('Informe o CPF do beneficiário')

    const validCpf = this._dataChecker.cpfChecker(cpf)

    if (!validCpf) throw customException('Cpf inválido')

    const userCpf = await this._validate.verifyUserCpf(cpf)

    if (!userCpf) throw customException('Cpf não cadastrado')

    if (!plan) throw customException('Informe o convênio do beneficiário')

    if (plan === 'Particular' && card !== '')
      customException('Paciente particular não usa código de beneficiário')

    if (plan !== 'Particular' && !card)
      throw customException('Informe o código do beneficiário')

    const validPlain = await this._validate.verifyPlain(cpf, plan)

    if (!validPlain) throw customException('O convênio informado não confere')

    const validCard = await this._validate.verifyCard(cpf, card)

    if (!validCard)
      throw customException('Número de beneficiário não encontrado')

    const userActive = await this._validate.userIsActive(cpf)

    if (!userActive)
      throw customException(
        'O agendamento está desabilitado porque o usuário não está ativo. Entre em contato com sua clínica.'
      )

    const patientName = await this._validate.getPatientName(cpf)

    try {
      const appointments = await this._repository.execute(
        id,
        patientName,
        cpf,
        plan,
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
