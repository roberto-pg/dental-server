import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ListSchedulesByDoctorController } from '../../schedule/controller/list_schedules_by_doctor_controller'
import { ListSchedulesByDoctorRepositoryImpl } from '../../schedule/datasource/list_schedules_by_doctor_repository_impl'
import { ListSchedulesByDoctorUseCase } from '../../schedule/domain/usecases/list_schedules_by_doctor_usecase'

export const listSchedulesByDoctorController = () => {
  const prisma = new PrismaServer()
  const repository = new ListSchedulesByDoctorRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ListSchedulesByDoctorUseCase(repository, validate)
  return new ListSchedulesByDoctorController(useCase)
}
