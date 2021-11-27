import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../../shared/ioc/types'
import { IListDoctorsByIdRepository } from '../repositories/list_doctors_by_id_repository'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'
import { Validate } from '../../../../shared/utils/validate'

@injectable()
class ListDoctorsByIdUseCase {
  private _repository: IListDoctorsByIdRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.ListDoctorsByIdRepositoryImpl)
    private readonly repository: IListDoctorsByIdRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const instanceUseCase = container.resolve(ListDoctorsByIdUseCase)

    const doctor = await instanceUseCase._validate.verifyDoctorId(id)

    if (!doctor) {
      throw customException('Doutor não encontrado')
    }

    try {
      const doctors = await instanceUseCase._repository.execute(id)

      return doctors
    } catch (error) {
      throw customException('Erro na busca por Id')
    }
  }
}

export { ListDoctorsByIdUseCase }
