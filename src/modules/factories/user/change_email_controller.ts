import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { DataChecker } from '../../../shared/utils/data_checker'
import { Validate } from '../../../shared/utils/validate'
import { ChangeEmailController } from '../../user/controller/change_email_controller'
import { ChangeEmailRepositoryImpl } from '../../user/datasource/change_email_repository_impl'
import { ChangeEmailUseCase } from '../../user/domain/usecases/change_email_usecase'

export const changeEmailController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangeEmailRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const dataChecker = new DataChecker()
  const useCase = new ChangeEmailUseCase(repository, validate, dataChecker)

  return new ChangeEmailController(useCase)
}
