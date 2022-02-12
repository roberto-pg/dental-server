import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { RemoveScheduleController } from '../../schedule/controller/remove_schedule_controller'
import { RemoveScheduleRepositoryImpl } from '../../schedule/datasource/remove_schedule_repository_impl'
import { RemoveScheduleUseCase } from '../../schedule/domain/usecases/remove_schedule_usecase'

export const removeScheduleController = () => {
  const prisma = new PrismaServer()
  const repository = new RemoveScheduleRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new RemoveScheduleUseCase(repository, validate)

  return new RemoveScheduleController(useCase)
}
