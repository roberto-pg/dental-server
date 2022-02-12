import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { CreateDoctorController } from '../../doctor/controller/create_doctor_controller'
import { CreateDoctorRepositoryImpl } from '../../doctor/datasource/create_doctor_repository_impl'
import { CreateDoctorUseCase } from '../../doctor/domain/usecases/create_doctor_usecase'

export const createDoctorController = () => {
  const prisma = new PrismaServer()
  const repository = new CreateDoctorRepositoryImpl(prisma)
  const useCase = new CreateDoctorUseCase(repository)

  return new CreateDoctorController(useCase)
}
