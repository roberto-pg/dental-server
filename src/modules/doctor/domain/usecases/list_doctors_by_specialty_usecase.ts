import { IListDoctorsBySpecialtyRepository } from '../repositories/list_doctors_by_specialty_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ListDoctorsBySpecialtyUseCase {
  private _repository: IListDoctorsBySpecialtyRepository
  constructor(readonly repository: IListDoctorsBySpecialtyRepository) {
    this._repository = repository
  }

  async call(specialty: string) {
    try {
      const doctors = await this._repository.execute(specialty)

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
