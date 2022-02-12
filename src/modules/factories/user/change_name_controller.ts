import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { DataChecker } from '../../../shared/utils/data_checker'
import { Validate } from '../../../shared/utils/validate'
import { ChangeNameController } from '../../user/controller/change_name_controller'
import { ChangeNameRepositoryImpl } from '../../user/datasource/change_name_repository_impl'
import { ChangeNameUseCase } from '../../user/domain/usecases/change_name_usecase'

export const changeNameController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangeNameRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const dataChecker = new DataChecker()
  const useCase = new ChangeNameUseCase(repository, validate, dataChecker)

  return new ChangeNameController(useCase)
}
