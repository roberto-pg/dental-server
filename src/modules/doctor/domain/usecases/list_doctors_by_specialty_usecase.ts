import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { IListDoctorsBySpecialtyRepository } from '../repositories/list_doctors_by_specialty_repository'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListDoctorsBySpecialtyUseCase {
  private _repository: IListDoctorsBySpecialtyRepository
  constructor(
    @inject(TYPES.ListDoctorsBySpecialtyRepositoryImpl)
    private readonly repository: IListDoctorsBySpecialtyRepository
  ) {
    this._repository = repository
  }

  async call(specialty: string) {
    try {
      const instanceUseCase = container.resolve(ListDoctorsBySpecialtyUseCase)

      const doctors = await instanceUseCase._repository.execute(specialty)

      const serializedDoctors = doctors.map((doctor) => {
        return {
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          imageUrl: doctor.image_url,
          bio: doctor.bio,
          active: doctor.active
        }
      })

      return serializedDoctors
    } catch (error) {
      throw customException('Erro na busca por especialidade')
    }
  }
}

export { ListDoctorsBySpecialtyUseCase }
