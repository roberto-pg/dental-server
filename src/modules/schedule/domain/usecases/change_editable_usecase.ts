import { IChangeEditableRepository } from '../repositories/change_editable_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangeEditableUseCase {
  private _repository: IChangeEditableRepository
  private _validate: Validate
  constructor(readonly repository: IChangeEditableRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, editable: boolean) {
    if (!id) throw customException('Informe o ID do agendamento')

    if (typeof id !== 'string') throw customException('O Id do agendamento deve ser uma string')

    const scheduleId = await this._validate.verifyScheduleId(id)

    if (!scheduleId) throw customException('Agendamento não localizado')

    try {
      const appointmentId = await this._repository.execute(id, editable)

      return appointmentId
    } catch (error) {
      throw customException('Falha para alterar a propriedade Editável')
    }
  }
}

export { ChangeEditableUseCase }
