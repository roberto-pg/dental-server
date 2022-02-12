import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { RemoveDoctorController } from '../../doctor/controller/remove_doctor_controller'
import { RemoveDoctorRepositoryImpl } from '../../doctor/datasource/remove_doctor_repository_impl'
import { RemoveDoctorUseCase } from '../../doctor/domain/usecases/remove_doctor_usecase'

export const removeDoctorController = () => {
  const prisma = new PrismaServer()
  const repository = new RemoveDoctorRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new RemoveDoctorUseCase(repository, validate)

  return new RemoveDoctorController(useCase)
}
