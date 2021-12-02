import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IChangeDoctorStatusRepository } from '../repositories/change_doctor_status_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ChangeDoctorStatusUseCase {
  private _repository: IChangeDoctorStatusRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ChangeDoctorStatusRepositoryImpl)
    private readonly repository: IChangeDoctorStatusRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, active: boolean) {
    const instanceUseCase = container.resolve(ChangeDoctorStatusUseCase)

    const doctor = await instanceUseCase._validate.verifyDoctorId(id)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const doctorId = await instanceUseCase._repository.execute(id, active)

      return doctorId
    } catch (error) {
      throw customException('Erro para mudar o status')
    }
  }
}

export { ChangeDoctorStatusUseCase }
