import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ChangePasswordController } from '../../user/controller/change_password.controller'
import { ChangePasswordRepositoryImpl } from '../../user/datasource/change_password_repository_impl'
import { ChangePasswordUseCase } from '../../user/domain/usecases/change_password_usecase'

export const changePasswordController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangePasswordRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ChangePasswordUseCase(repository, validate)

  return new ChangePasswordController(useCase)
}
