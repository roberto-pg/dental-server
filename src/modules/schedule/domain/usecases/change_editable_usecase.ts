import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeEditableRepository } from '../repositories/change_editable_repository'
import { Validate } from '../../../../shared/utils/validate'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ChangeEditableUseCase {
  private _repository: IChangeEditableRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ChangeEditableRepositoryImpl)
    private readonly repository: IChangeEditableRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, editable: boolean) {
    const instanceUseCase = container.resolve(ChangeEditableUseCase)

    if (!id) throw customException('Informe o ID do agendamento')
    console.log(id)
    if (typeof id !== 'string')
      throw customException('O Id do agendamento deve ser uma string')

    const scheduleId = await instanceUseCase._validate.verifyScheduleId(id)

    if (!scheduleId) throw customException('Agendamento não localizado')

    try {
      const appointmentId = await instanceUseCase._repository.execute(
        id,
        editable
      )

      return appointmentId
    } catch (error) {
      throw customException('Falha para alterar a propriedade Editável')
    }
  }
}

export { ChangeEditableUseCase }
