import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { ListSchedulesByScheduledController } from '../../schedule/controller/list_schedules_by_scheduled_controller'
import { ListSchedulesByScheduledRepositoryImpl } from '../../schedule/datasource/list_schedules_by_scheduled_repository_impl'
import { ListSchedulesByScheduledUseCase } from '../../schedule/domain/usecases/lists_schedules_by_scheduled_usecase'

export const listSchedulesByScheduledController = () => {
  const prisma = new PrismaServer()
  const repository = new ListSchedulesByScheduledRepositoryImpl(prisma)
  const useCase = new ListSchedulesByScheduledUseCase(repository)

  return new ListSchedulesByScheduledController(useCase)
}
