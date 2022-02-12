import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { ListDoctorsBySpecialtyController } from '../../doctor/controller/list_doctors_by_specialty_controller'
import { ListDoctorsBySpecialtyRepositoryImpl } from '../../doctor/datasource/list_doctors_by_specialty_repository_impl'
import { ListDoctorsBySpecialtyUseCase } from '../../doctor/domain/usecases/list_doctors_by_specialty_usecase'

export const listDoctorsBySpecialtyController = () => {
  const prisma = new PrismaServer()
  const repository = new ListDoctorsBySpecialtyRepositoryImpl(prisma)
  const useCase = new ListDoctorsBySpecialtyUseCase(repository)

  return new ListDoctorsBySpecialtyController(useCase)
}
