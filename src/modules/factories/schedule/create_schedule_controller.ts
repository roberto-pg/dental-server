import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { CreateScheduleController } from '../../schedule/controller/create_schedule_controller'
import { CreateScheduleRepositoryImpl } from '../../schedule/datasource/create_schedule_repository_impl'
import { CreateScheduleUseCase } from '../../schedule/domain/usecases/create_schedule_usecase'

export const createScheduleController = () => {
  const prisma = new PrismaServer()
  const repository = new CreateScheduleRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new CreateScheduleUseCase(repository, validate)

  return new CreateScheduleController(useCase)
}
