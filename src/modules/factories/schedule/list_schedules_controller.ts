import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { ListSchedulesController } from '../../schedule/controller/list_schedules_controller'
import { ListSchedulesRepositoryImpl } from '../../schedule/datasource/list_schedules_repository_impl'
import { ListSchedulesUseCase } from '../../schedule/domain/usecases/list_schedules_usecase'

export const listSchedulesController = () => {
  const prisma = new PrismaServer()
  const repository = new ListSchedulesRepositoryImpl(prisma)
  const useCase = new ListSchedulesUseCase(repository)

  return new ListSchedulesController(useCase)
}
