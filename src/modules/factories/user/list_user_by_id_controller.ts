import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ListUserByIdController } from '../../user/controller/list_user_by_id_controller'
import { ListUserByIdRepositoryImpl } from '../../user/datasource/list_user_by_id_repository_impl'
import { ListUserByIdUseCase } from '../../user/domain/usecases/list_user_by_id_usecase'

export const listUserByIdController = () => {
  const prisma = new PrismaServer()
  const repository = new ListUserByIdRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ListUserByIdUseCase(repository, validate)

  return new ListUserByIdController(useCase)
}
