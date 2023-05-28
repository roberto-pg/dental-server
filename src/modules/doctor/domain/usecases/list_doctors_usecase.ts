import { IListDoctorsRepository } from '../repositories/list_doctors_repository'
import { customException } from '../../../../shared/errors/custom_exception'

class ListDoctorsUseCase {
  private _repository: IListDoctorsRepository
  constructor(readonly repository: IListDoctorsRepository) {
    this._repository = repository
  }

  async call() {
    try {
      const doctors = await this._repository.execute()

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
      throw customException('Erro na busca')
    }
  }
}

export { ListDoctorsUseCase }
