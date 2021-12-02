import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { ICreateDoctorRepository } from '../repositories/create_doctor_repository'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class CreateDoctorUseCase {
  private _repository: ICreateDoctorRepository
  constructor(
    @inject(TYPES.CreateDoctorRepositoryImpl)
    private readonly repository: ICreateDoctorRepository
  ) {
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
      const instanceUseCase = container.resolve(CreateDoctorUseCase)

      const doctor = await instanceUseCase._repository.execute(
        name,
        specialty,
        image_url,
        bio
      )

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
