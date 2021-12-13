import fs from 'fs'
import { IRemoveDoctorRepository } from '../repositories/remove_doctor_repository'
import { Validate } from '../../../../shared/utils/validate'
import { customException } from '../../../../shared/errors/custom_exception'
require('dotenv').config()

class RemoveDoctorUseCase {
  private _repository: IRemoveDoctorRepository
  private _validate: Validate
  constructor(
    readonly repository: IRemoveDoctorRepository,
    readonly validate: Validate
  ) {
    this._repository = repository
    this._validate = validate
  }

  async call(id: string) {
    const doctor = await this._validate.verifyDoctorId(id)

    if (!doctor) {
      customException('Doutor não encontrado')
    }

    try {
      const userId = await this._repository.execute(id)
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
