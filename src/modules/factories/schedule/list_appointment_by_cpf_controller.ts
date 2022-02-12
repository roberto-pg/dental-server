import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { DataChecker } from '../../../shared/utils/data_checker'
import { ListAppointmentByCpfController } from '../../schedule/controller/list_appointment_by_cpf_controller'
import { ListAppointmentByCpfRepositoryImpl } from '../../schedule/datasource/list_appointment_by_cpf_repository_impl'
import { ListAppointmentByCpfUseCase } from '../../schedule/domain/usecases/list_appointment_by_cpf_usecase'

export const listAppointmentByCpfController = () => {
  const prisma = new PrismaServer()
  const repository = new ListAppointmentByCpfRepositoryImpl(prisma)
  const dataChecker = new DataChecker()
  const useCase = new ListAppointmentByCpfUseCase(repository, dataChecker)

  return new ListAppointmentByCpfController(useCase)
}
