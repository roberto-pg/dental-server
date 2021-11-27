import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import fs from 'fs'
import { IRemoveDoctorRepository } from '../repositories/remove_doctor_repository'
import { Validate } from '../../../../shared/utils/validate'
import { TYPES } from '../../../../shared/ioc/types'
import container from '../../../../shared/ioc/inversify_config'
import { customException } from '../../../../shared/errors/custom_exception'
require('dotenv').config()

@injectable()
class RemoveDoctorUseCase {
  private _repository: IRemoveDoctorRepository
  private _validate: Validate
  constructor(
    @inject(TYPES.RemoveDoctorRepositoryImpl)
    private readonly repository: IRemoveDoctorRepository,
    @inject(TYPES.Validate) private readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const instanceUseCase = container.resolve(RemoveDoctorUseCase)

    const doctor = await instanceUseCase._validate.verifyDoctorId(id)

    if (!doctor) {
      customException('Doutor não encontrado')
    }

    try {
      const userId = await instanceUseCase._repository.execute(id)
      const imageName = doctor.image_url.split('/')[3]

      fs.unlink(process.env.IMAGE_STORAGE + '/' + imageName, function (err) {
        if (err) {
          customException('Falha para deletar a imagem do doutor')
        }
      })
      return userId
    } catch (error) {
      throw customException('Erro ao excluir doutor')
    }
  }
}

export { RemoveDoctorUseCase }
