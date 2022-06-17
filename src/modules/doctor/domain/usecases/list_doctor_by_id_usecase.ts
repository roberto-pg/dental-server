import { IListDoctorByIdRepository } from '../repositories/list_doctor_by_id_repository'
import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'

class ListDoctorByIdUseCase {
  private _repository: IListDoctorByIdRepository
  private _validate: Validate
  constructor(
    readonly repository: IListDoctorByIdRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const doctorId = await this._validate.verifyDoctorId(id)

    if (!doctorId) {
      throw customException('Doutor não encontrado')
    }

    try {
      const doctor = await this._repository.execute(id)

      const serializedDoctor = {
        id: doctor?.id,
        name: doctor?.name,
        specialty: doctor?.specialty,
        imageUrl: doctor?.image_url,
        bio: doctor?.bio,
        active: doctor?.active,
      }

      return serializedDoctor
    } catch (error) {
      throw customException('Erro na busca por Id')
    }
  }
}

export { ListDoctorByIdUseCase }
