import AuthenticateAdminController from '../../auth/controller/authenticate_admin_controller'
import { AuthenticateAdminUseCase } from '../../auth/domain/usecases/authenticate_admin_usecase'
import { AuthenticateAdminRepositoryImpl } from '../../auth/datasource/authenticate_admin_repository_impl'
import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { DataChecker } from '../../../shared/utils/data_checker'
export const authenticateAdminController = () => {
  const prisma = new PrismaServer()
  const repository = new AuthenticateAdminRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const dataChecker = new DataChecker()

  const useCase = new AuthenticateAdminUseCase(repository, validate, dataChecker)

  return new AuthenticateAdminController(useCase)
}
