import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ChangeStatusController } from '../../user/controller/change_status_controller'
import { ChangeStatusRepositoryImpl } from '../../user/datasource/change_status_repository_impl'
import { ChangeStatusUseCase } from '../../user/domain/usecases/change_status_usecase'

export const changeStatusController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangeStatusRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ChangeStatusUseCase(repository, validate)

  return new ChangeStatusController(useCase)
}
