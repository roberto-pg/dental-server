import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ChangeDoctorStatusController } from '../../doctor/controller/change_doctor_status_controller'
import { ChangeDoctorStatusRepositoryImpl } from '../../doctor/datasource/change_doctor_status_repository_impl'
import { ChangeDoctorStatusUseCase } from '../../doctor/domain/usecases/change_doctor_status_usecase'

export const changeDoctorStatusController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangeDoctorStatusRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ChangeDoctorStatusUseCase(repository, validate)

  return new ChangeDoctorStatusController(useCase)
}
