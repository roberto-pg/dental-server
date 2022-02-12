import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { LogoutUserController } from '../../auth/controller/logout_user_controller'
import { LogoutUserRepositoryImpl } from '../../auth/datasource/logout_user_repository_impl'
import { LogoutUserUseCase } from '../../auth/domain/usecases/logout_user_usecase'

export const logoutUserController = () => {
  const prisma = new PrismaServer()
  const repository = new LogoutUserRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new LogoutUserUseCase(repository, validate)

  return new LogoutUserController(useCase)
}
