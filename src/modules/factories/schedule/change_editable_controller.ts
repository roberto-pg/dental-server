import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ChangeEditableController } from '../../schedule/controller/change_editable_controller'
import { ChangeEditableRepositoryImpl } from '../../schedule/datasource/change_editable_repository_impl'
import { ChangeEditableUseCase } from '../../schedule/domain/usecases/change_editable_usecase'

export const changeEditableController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangeEditableRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ChangeEditableUseCase(repository, validate)

  return new ChangeEditableController(useCase)
}
