import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { RemoveAppointmentController } from '../../schedule/controller/remove_appointment_controller'
import { RemoveAppointmentRepositoryImpl } from '../../schedule/datasource/remove_appointment_repository.impl'
import { RemoveAppointmentUseCase } from '../../schedule/domain/usecases/remove_appointment_usecase'

export const removeAppointmentController = () => {
  const prisma = new PrismaServer()
  const repository = new RemoveAppointmentRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new RemoveAppointmentUseCase(repository, validate)

  return new RemoveAppointmentController(useCase)
}
