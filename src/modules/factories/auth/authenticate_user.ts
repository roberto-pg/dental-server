import AuthenticateUserController from '../../auth/controller/authenticate_user_controller'
import { AuthenticateUserUseCase } from '../../auth/domain/usecases/authenticate_user_usecase'
import { AuthenticateUserRepositoryImpl } from '../../auth/datasource/authenticate_user_repository_impl'
import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { DataChecker } from '../../../shared/utils/data_checker'

export const authenticateUserController = () => {
  const prisma = new PrismaServer()
  const repository = new AuthenticateUserRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const dataChecker = new DataChecker()
  const useCase = new AuthenticateUserUseCase(repository, validate, dataChecker)

  return new AuthenticateUserController(useCase)
}
