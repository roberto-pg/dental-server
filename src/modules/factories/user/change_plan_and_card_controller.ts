import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ChangePlanAndCardController } from '../../user/controller/change_plan_and_card_controller'
import { ChangePlanAndCardRepositoryImpl } from '../../user/datasource/change_plan_and_card_repository_impl'
import { ChangePlanAndCardUseCase } from '../../user/domain/usecases/change_plan_and_card_usecase'

export const changePlanAndCardController = () => {
  const prisma = new PrismaServer()
  const repository = new ChangePlanAndCardRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ChangePlanAndCardUseCase(repository, validate)

  return new ChangePlanAndCardController(useCase)
}
