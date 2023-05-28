import { IChangeDoctorStatusRepository } from '../repositories/change_doctor_status_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'

class ChangeDoctorStatusUseCase {
  private _repository: IChangeDoctorStatusRepository
  private _validate: Validate
  constructor(readonly repository: IChangeDoctorStatusRepository, readonly validate: Validate) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string, active: boolean) {
    const doctor = await this._validate.verifyDoctorId(id)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const doctorId = await this._repository.execute(id, active)

      return doctorId
    } catch (error) {
      throw customException('Erro para mudar o status')
    }
  }
}

export { ChangeDoctorStatusUseCase }
