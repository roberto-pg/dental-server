import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { ListDoctorsController } from '../../doctor/controller/list_doctors_controller'
import { ListDoctorsRepositoryImpl } from '../../doctor/datasource/list_doctors_repository_impl'
import { ListDoctorsUseCase } from '../../doctor/domain/usecases/list_doctors_usecase'

export const listDoctorsController = () => {
  const prisma = new PrismaServer()
  const repository = new ListDoctorsRepositoryImpl(prisma)
  const useCase = new ListDoctorsUseCase(repository)

  return new ListDoctorsController(useCase)
}
