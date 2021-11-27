import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListAppointmentByCpfRepository } from '../repositories/list_appointment_by_cpf_repository'
import { TYPES } from '../../../../shared/ioc/types'
import { customException } from '../../../../shared/errors/custom_exception'
import container from '../../../../shared/ioc/inversify_config'
import { DataChecker } from '../../../../shared/utils/data_checker'

@injectable()
class ListAppointmentByCpfUseCase {
  private _repository: IListAppointmentByCpfRepository
  private _dataChecker: DataChecker
  constructor(
    @inject(TYPES.ListAppointmentByCpfRepositoryImpl)
    private readonly repository: IListAppointmentByCpfRepository,
    @inject(TYPES.DataChecker) private readonly validate: DataChecker
  ) {
    this._repository = repository
    this._dataChecker = validate
  }

  async call(cpf: string) {
    const instanceUseCase = container.resolve(ListAppointmentByCpfUseCase)

    if (!cpf) {
      throw customException('Informe o CPF')
    }

    const validCpf = await instanceUseCase._dataChecker.cpfChecker(cpf)

    if (!validCpf) {
      throw customException('Cpf inválido')
    }

    try {
      const currentDay = new Date()
      currentDay.setHours(0, 0, 0, 0)

      const schedulings = await instanceUseCase._repository.execute(
        cpf,
        currentDay
      )

      return schedulings
    } catch (error) {
      throw customException('Falha para buscar os agendamentos')
    }
  }
}

export { ListAppointmentByCpfUseCase }
