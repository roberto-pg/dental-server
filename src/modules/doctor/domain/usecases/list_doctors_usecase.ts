import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { IListDoctorsRepository } from '../repositories/list_doctors_repository'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'

@injectable()
class ListDoctorsUseCase {
  private _repository: IListDoctorsRepository
  constructor(
    @inject(TYPES.ListDoctorsRepositoryImpl)
    private readonly repository: IListDoctorsRepository
  ) {
    this._repository = repository
  }

  async call() {
    try {
      const instanceUseCase = container.resolve(ListDoctorsUseCase)

      const doctors = await instanceUseCase._repository.execute()

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
      customException('Erro na busca')
    }
  }
}

export { ListDoctorsUseCase }
