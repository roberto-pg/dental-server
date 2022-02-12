import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { ListUsersController } from '../../user/controller/list_users_controller'
import { ListUsersRepositoryImpl } from '../../user/datasource/list_users_repository.impl'
import { ListUsersUseCase } from '../../user/domain/usecases/list_users_usecase'

export const listUsersController = () => {
  const prisma = new PrismaServer()
  const repository = new ListUsersRepositoryImpl(prisma)
  const useCase = new ListUsersUseCase(repository)

  return new ListUsersController(useCase)
}
