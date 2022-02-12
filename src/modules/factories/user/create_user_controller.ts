import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { DataChecker } from '../../../shared/utils/data_checker'
import { Validate } from '../../../shared/utils/validate'
import CreateUserController from '../../user/controller/create_user_controller'
import { CreateUserRepositoryImpl } from '../../user/datasource/create_user_repository_impl'
import { CreateUserUseCase } from '../../user/domain/usecases/create_user_usecase'

export const createUserController = () => {
  const prisma = new PrismaServer()
  const repository = new CreateUserRepositoryImpl(prisma)
  const dataChecker = new DataChecker()
  const validate = new Validate(prisma)
  const useCase = new CreateUserUseCase(repository, dataChecker, validate)

  return new CreateUserController(useCase)
}
