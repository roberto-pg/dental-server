import { PrismaServer } from '../../../shared/prisma/prisma_server'
import { Validate } from '../../../shared/utils/validate'
import { ListDoctorByIdController } from '../../doctor/controller/list_doctor_by_id_controller'
import { ListDoctorByIdRepositoryImpl } from '../../doctor/datasource/list_doctor_by_id_repository_impl'
import { ListDoctorByIdUseCase } from '../../doctor/domain/usecases/list_doctor_by_id_usecase'

export const listDoctorByIdController = () => {
  const prisma = new PrismaServer()
  const repository = new ListDoctorByIdRepositoryImpl(prisma)
  const validate = new Validate(prisma)
  const useCase = new ListDoctorByIdUseCase(repository, validate)

  return new ListDoctorByIdController(useCase)
}
