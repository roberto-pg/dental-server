import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { MobListSchedulesByDoctorController } from '../../schedule/controller/mob_list_schedules_by_doctor_controller'
import { MobListSchedulesByDoctorRepositoryImpl } from '../../schedule/datasource/mob_list_schedules_by_doctor_repository_impl'
import { MobListSchedulesByDoctorUseCase } from '../../schedule/domain/usecases/mob_list_schedules_by_doctor_usecase'

export const mobListSchedulesByDoctorController = () => {
  const prisma = new PrismaServer()
  const repository = new MobListSchedulesByDoctorRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new MobListSchedulesByDoctorUseCase(repository, validate)

  return new MobListSchedulesByDoctorController(useCase)
}
