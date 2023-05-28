import { ICreateDoctorRepository } from '../repositories/create_doctor_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class CreateDoctorUseCase {
  private _repository: ICreateDoctorRepository
  constructor(readonly repository: ICreateDoctorRepository) {
    this._repository = repository
  }

  async call(name: string, specialty: string, image_url: string, bio: string) {
    if (!name) {
      throw customException('Informe o nome do doutor')
    }

    if (!specialty) {
      throw customException('Informe a especialidade')
    }

    if (!bio) {
      throw customException('Adicione uma bio')
    }

    try {
      const doctor = await this._repository.execute(name, specialty, image_url, bio)

      const serializedDoctor = {
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        imageUrl: doctor.image_url,
        bio: doctor.bio
      }

      return serializedDoctor
    } catch (error) {
      throw customException('Falha para cadastrar doutor')
    }
  }
}

export { CreateDoctorUseCase }
