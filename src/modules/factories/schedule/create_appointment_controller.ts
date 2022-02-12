import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { DataChecker } from '../../../shared/utils/data_checker'
import { Validate } from '../../../shared/utils/validate'
import { CreateAppointmentController } from '../../schedule/controller/create_appointment_controller'
import { CreateAppointmentRepositoryImpl } from '../../schedule/datasource/create_appointment_repository_impl'
import { CreateAppointmentUseCase } from '../../schedule/domain/usecases/create_appointment_usecase'

export const createAppointmentController = () => {
  const prisma = new PrismaServer()
  const repository = new CreateAppointmentRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const dataChecker = new DataChecker()
  const useCase = new CreateAppointmentUseCase(
    repository,
    validate,
    dataChecker
  )

  return new CreateAppointmentController(useCase)
}
