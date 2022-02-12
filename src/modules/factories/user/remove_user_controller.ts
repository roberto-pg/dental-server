import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { RemoveUserController } from '../../user/controller/remove_user_controller'
import { RemoveUserRepositoryImpl } from '../../user/datasource/remove_user_repository_impl'
import { RemoveUserUseCase } from '../../user/domain/usecases/remove_user_usecase'

export const removeUserController = () => {
  const prisma = new PrismaServer()
  const repository = new RemoveUserRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new RemoveUserUseCase(repository, validate)

  return new RemoveUserController(useCase)
}
