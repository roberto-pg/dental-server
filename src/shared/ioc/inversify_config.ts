import 'reflect-metadata'
import { Container } from 'inversify'
import CreateUserController from '../../modules/user/controller/create_user_controller'
import { TYPES } from './types'
import { ICreateUserRepository } from '../../modules/user/domain/repositories/create_user_repository'
import { CreateUserRepositoryImpl } from '../../modules/user/datasource/create_user_repository_impl'
import { CreateUserUseCase } from '../../modules/user/domain/usecases/create_user_usecase'
import { AuthenticateUserRepositoryImpl } from '../../modules/auth/datasource/authenticate_user_repository_impl'
import { IAuthenticateUserRepository } from '../../modules/auth/domain/repositories/authenticate_user_repository'
import AuthenticateUserController from '../../modules/auth/controller/authenticate_user_controller'
import { Validate } from '../utils/validate'
import { DataChecker } from '../utils/data_checker'
import { IListUsersRepository } from '../../modules/user/domain/repositories/list_users_repository'
import { ListUsersRepositoryImpl } from '../../modules/user/datasource/list_users_repository.impl'
import { ListUsersUseCase } from '../../modules/user/domain/usecases/list_users_usecase'
import { ListUsersController } from '../../modules/user/controller/list_users_controller'
import { ILogoutUserRepository } from '../../modules/auth/domain/repositories/logout_user_repository'
import { LogoutUserController } from '../../modules/auth/controller/logout_user_controller'
import { IAuthenticateAdminRepository } from '../../modules/auth/domain/repositories/authenticate_admin_repository'
import { AuthenticateAdminRepositoryImpl } from '../../modules/auth/datasource/authenticate_admin_repository_impl'
import { AuthenticateAdminController } from '../../modules/auth/controller/authenticate_admin_controller'
import { ListUserByIdRepositoryImpl } from '../../modules/user/datasource/list_user_by_id_repository_impl'
import { IListUserByIdRepository } from '../../modules/user/domain/repositories/list_user_by_id_repository'
import { ListUserByIdUseCase } from '../../modules/user/domain/usecases/list_user_by_id_usecase'
import { ListUserByIdController } from '../../modules/user/controller/list_user_by_id_controller'
import { RemoveUserRepositoryImpl } from '../../modules/user/datasource/remove_user_repository_impl'
import { IRemoveUserRepository } from '../../modules/user/domain/repositories/remove_user_repository'
import { RemoveUserUseCase } from '../../modules/user/domain/usecases/remove_user_usecase'
import { RemoveUserController } from '../../modules/user/controller/remove_user_controller'
import { LogoutUserRepositoryImpl } from '../../modules/auth/datasource/logout_user_repository_impl'
import { AuthenticateUserUseCase } from '../../modules/auth/domain/usecases/authenticate_user_usecase'
import { LogoutUserUseCase } from '../../modules/auth/domain/usecases/logout_user_usecase'
import { AuthenticateAdminUseCase } from '../../modules/auth/domain/usecases/authenticate_admin_usecase'
import { ChangeStatusRepositoryImpl } from '../../modules/user/datasource/change_status_repository_impl'
import { IChangeStatusRepository } from '../../modules/user/domain/repositories/change_status_repository'
import { ChangeStatusUseCase } from '../../modules/user/domain/usecases/change_status_usecase'
import { ChangeStatusController } from '../../modules/user/controller/change_status_controller'
import { IChangeNameOrEmailRepository } from '../../modules/user/domain/repositories/change_name_or_email_repository'
import { ChangeNameOrEmailRepositoryImpl } from '../../modules/user/datasource/change_name_or_email_repository_impl'
import { ChangeNameOrEmailUseCase } from '../../modules/user/domain/usecases/change_name_or_email_usecase'
import { ChangeNameOrEmailController } from '../../modules/user/controller/change_name_or_email_controller'
import { IChangePlainAndCardRepository } from '../../modules/user/domain/repositories/change_plain_and_card_repository'
import { ChangePlainAndCardRepositoryImpl } from '../../modules/user/datasource/change_plain_and_card_repository_impl'
import { ChangePlainAndCardUseCase } from '../../modules/user/domain/usecases/change_plain_and_card_usecase'
import { ChangePlainAndCardController } from '../../modules/user/controller/change_plain_and_card_controller'
import { ChangePasswordRepositoryImpl } from '../../modules/user/datasource/change_password_repository_impl'
import { IChangePasswordRepository } from '../../modules/user/domain/repositories/change_password.repository'
import { ChangePasswordUseCase } from '../../modules/user/domain/usecases/change_password_usecase'
import { ChangePasswordController } from '../../modules/user/controller/change_password.controller'
import { CreateDoctorController } from '../../modules/doctor/controller/create_doctor_controller'
import { ICreateDoctorRepository } from '../../modules/doctor/domain/repositories/create_doctor_repository'
import { CreateDoctorRepositoryImpl } from '../../modules/doctor/datasource/create_doctor_repository_impl'
import { CreateDoctorUseCase } from '../../modules/doctor/domain/usecases/create_doctor_usecase'
import { RemoveDoctorRepositoryImpl } from '../../modules/doctor/datasource/remove_doctor_repository_impl'
import { IRemoveDoctorRepository } from '../../modules/doctor/domain/repositories/remove_doctor_repository'
import { RemoveDoctorUseCase } from '../../modules/doctor/domain/usecases/remove_doctor_usecase'
import { RemoveDoctorController } from '../../modules/doctor/controller/remove_doctor_controller'
import { ListDoctorsRepositoryImpl } from '../../modules/doctor/datasource/list_doctors_repository_impl'
import { IListDoctorsRepository } from '../../modules/doctor/domain/repositories/list_doctors_repository'
import { ListDoctorsUseCase } from '../../modules/doctor/domain/usecases/list_doctors_usecase'
import { ListDoctorsController } from '../../modules/doctor/controller/list_doctors_controller'
import { IListDoctorsBySpecialtyRepository } from '../../modules/doctor/domain/repositories/list_doctors_by_specialty_repository'
import { ListDoctorsBySpecialtyRepositoryImpl } from '../../modules/doctor/datasource/list_doctors_by_specialty_repository_impl'
import { ListDoctorsBySpecialtyUseCase } from '../../modules/doctor/domain/usecases/list_doctors_by_specialty_usecase'
import { ListDoctorsBySpecialtyController } from '../../modules/doctor/controller/list_doctors_by_specialty_controller'
import { ListDoctorsByIdRepositoryImpl } from '../../modules/doctor/datasource/list_doctors_by_id_repository_impl'
import { IListDoctorsByIdRepository } from '../../modules/doctor/domain/repositories/list_doctors_by_id_repository'
import { ListDoctorsByIdUseCase } from '../../modules/doctor/domain/usecases/list_doctors_by_id_usecase'
import { ListDoctorsByIdController } from '../../modules/doctor/controller/list_doctors_by_id_controller'
import { CreateScheduleRepositoryImpl } from '../../modules/schedule/datasource/create_schedule_repository_impl'
import { ICreateScheduleRepository } from '../../modules/schedule/domain/repositories/create_schedule_repository'
import { CreateScheduleController } from '../../modules/schedule/controller/create_schedule_controller'
import { CreateScheduleUseCase } from '../../modules/schedule/domain/usecases/create_schedule_usecase'
import { RemoveScheduleRepositoryImpl } from '../../modules/schedule/datasource/remove_schedule_repository_impl'
import { IRemoveScheduleRepository } from '../../modules/schedule/domain/repositories/remove_schedule_repository'
import { RemoveScheduleUseCase } from '../../modules/schedule/domain/usecases/remove_schedule_usecase'
import { RemoveScheduleController } from '../../modules/schedule/controller/remove_schedule_controller'
import { ListSchedulesRepositoryImpl } from '../../modules/schedule/datasource/list_schedules_repository_impl'
import { IListSchedulesRepository } from '../../modules/schedule/domain/repositories/list_schedules_repository'
import { ListSchedulesUseCase } from '../../modules/schedule/domain/usecases/list_schedules_usecase'
import { ListSchedulesControler } from '../../modules/schedule/controller/list_schedules_controller'
import { IListSchedulesByScheduledRepository } from '../../modules/schedule/domain/repositories/list_schedules_by_scheduled_repository'
import { ListSchedulesByScheduledUseCase } from '../../modules/schedule/domain/usecases/lists_schedules_by_scheduled_usecase'
import { ListSchedulesByScheduledController } from '../../modules/schedule/controller/list_schedules_by_scheduled_controller'
import { ListSchedulesByScheduledRepositoryImpl } from '../../modules/schedule/datasource/list_schedules_by_scheduled_repository_impl'
import { ListSchedulesByDoctorRepositoryImpl } from '../../modules/schedule/datasource/list_schedules_by_doctor_repository_impl'
import { IListSchedulesByDoctorRepository } from '../../modules/schedule/domain/repositories/list_schedules_by_doctor_repository'
import { ListSchedulesByDoctorUseCase } from '../../modules/schedule/domain/usecases/list_schedules_by_doctor_usecase'
import { ListSchedulesByDoctorController } from '../../modules/schedule/controller/list_schedules_by_doctor_controller'
import { IMobListSchedulesByDoctorRepository } from '../../modules/schedule/domain/repositories/mob_list_schedules_by_doctor_repository'
import { MobListSchedulesByDoctorRepositoryImpl } from '../../modules/schedule/datasource/mob_list_schedules_by_doctor_repository_impl'
import { MobListSchedulesByDoctorUseCase } from '../../modules/schedule/domain/usecases/mob_list_schedules_by_doctor_usecase'
import { MobListSchedulesByDoctorController } from '../../modules/schedule/controller/mob_list_schedules_by_doctor_controller'
import { ListAppointmentByCpfRepositoryImpl } from '../../modules/schedule/datasource/list_appointment_by_cpf_repository_impl'
import { IListAppointmentByCpfRepository } from '../../modules/schedule/domain/repositories/list_appointment_by_cpf_repository'
import { ListAppointmentByCpfUseCase } from '../../modules/schedule/domain/usecases/list_appointment_by_cpf_usecase'
import { ListAppointmentByCpfController } from '../../modules/schedule/controller/list_appointment_by_cpf_controller'
import { CreateAppointmentRepositoryImpl } from '../../modules/schedule/datasource/create_appointment_repository_impl'
import { ICreateAppointmentRepository } from '../../modules/schedule/domain/repositories/create_appointment_repository'
import { CreateAppointmentUseCase } from '../../modules/schedule/domain/usecases/create_appointment_usecase'
import { CreateAppointmentController } from '../../modules/schedule/controller/create_appointment_controller'
import { ChangeEditableRepositoryImpl } from '../../modules/schedule/datasource/change_editable_repository_impl'
import { IChangeEditableRepository } from '../../modules/schedule/domain/repositories/change_editable_repository'
import { ChangeEditableUseCase } from '../../modules/schedule/domain/usecases/change_editable_usecase'
import { ChangeEditableController } from '../../modules/schedule/controller/change_editable_controller'
import { RemoveAppointmentRepositoryImpl } from '../../modules/schedule/datasource/remove_appointment_repository.impl'
import { IRemoveAppointmentRepository } from '../../modules/schedule/domain/repositories/remove_appointment_repository'
import { RemoveAppointmentUseCase } from '../../modules/schedule/domain/usecases/remove_appointment_usecase'
import { RemoveAppointmentController } from '../../modules/schedule/controller/remove_appointment_controller'
import { PrismaServer } from '../prisma/prisma_server'
import IHttpService from '../prisma/http_service'
import { IChangeDoctorStatusRepository } from '../../modules/doctor/domain/repositories/change_doctor_status_repository'
import { ChangeDoctorStatusRepositoryImpl } from '../../modules/doctor/datasource/change_doctor_status_repository_impl'
import { ChangeDoctorStatusUseCase } from '../../modules/doctor/domain/usecases/change_doctor_status_usecase'
import { ChangeDoctorStatusController } from '../../modules/doctor/controller/change_doctor_status_controller'

const container = new Container()

container
  .bind<ICreateUserRepository>(TYPES.CreateUserRepositoryImpl)
  .to(CreateUserRepositoryImpl)
container
  .bind<IAuthenticateUserRepository>(TYPES.AuthenticateUserRepositoryImpl)
  .to(AuthenticateUserRepositoryImpl)
container
  .bind<IListUsersRepository>(TYPES.ListUsersRepositoryImpl)
  .to(ListUsersRepositoryImpl)
container
  .bind<ILogoutUserRepository>(TYPES.LogoutUserRepositoryImpl)
  .to(LogoutUserRepositoryImpl)
container
  .bind<IAuthenticateAdminRepository>(TYPES.AuthenticateAdminRepositoryImpl)
  .to(AuthenticateAdminRepositoryImpl)
container
  .bind<IListUserByIdRepository>(TYPES.ListUserByIdRepositoryImpl)
  .to(ListUserByIdRepositoryImpl)
container
  .bind<IRemoveUserRepository>(TYPES.RemoveUserRepositoryImpl)
  .to(RemoveUserRepositoryImpl)
container
  .bind<IChangeStatusRepository>(TYPES.ChangeStatusRepositoryImpl)
  .to(ChangeStatusRepositoryImpl)
container
  .bind<IChangeDoctorStatusRepository>(TYPES.ChangeDoctorStatusRepositoryImpl)
  .to(ChangeDoctorStatusRepositoryImpl)
container
  .bind<IChangeNameOrEmailRepository>(TYPES.ChangeNameOrEmailRepositoryImpl)
  .to(ChangeNameOrEmailRepositoryImpl)
container
  .bind<IChangePlainAndCardRepository>(TYPES.ChangePlainAndCardRepositoryImpl)
  .to(ChangePlainAndCardRepositoryImpl)
container
  .bind<IChangePasswordRepository>(TYPES.ChangePasswordRepositoryImpl)
  .to(ChangePasswordRepositoryImpl)
container
  .bind<ICreateDoctorRepository>(TYPES.CreateDoctorRepositoryImpl)
  .to(CreateDoctorRepositoryImpl)
container
  .bind<IRemoveDoctorRepository>(TYPES.RemoveDoctorRepositoryImpl)
  .to(RemoveDoctorRepositoryImpl)
container
  .bind<IListDoctorsRepository>(TYPES.ListDoctorsRepositoryImpl)
  .to(ListDoctorsRepositoryImpl)
container
  .bind<IListDoctorsBySpecialtyRepository>(
    TYPES.ListDoctorsBySpecialtyRepositoryImpl
  )
  .to(ListDoctorsBySpecialtyRepositoryImpl)
container
  .bind<IListDoctorsByIdRepository>(TYPES.ListDoctorsByIdRepositoryImpl)
  .to(ListDoctorsByIdRepositoryImpl)
container
  .bind<ICreateScheduleRepository>(TYPES.CreateScheduleRepositoryImpl)
  .to(CreateScheduleRepositoryImpl)
container
  .bind<IRemoveScheduleRepository>(TYPES.RemoveScheduleRepositoryImpl)
  .to(RemoveScheduleRepositoryImpl)
container
  .bind<IListSchedulesRepository>(TYPES.ListSchedulesRepositoryImpl)
  .to(ListSchedulesRepositoryImpl)
container
  .bind<IListSchedulesByScheduledRepository>(
    TYPES.ListSchedulesByScheduledRepositoryImpl
  )
  .to(ListSchedulesByScheduledRepositoryImpl)
container
  .bind<IListSchedulesByDoctorRepository>(
    TYPES.ListSchedulesByDoctorRepositoryImpl
  )
  .to(ListSchedulesByDoctorRepositoryImpl)
container
  .bind<IMobListSchedulesByDoctorRepository>(
    TYPES.MobListSchedulesByDoctorRepositoryImpl
  )
  .to(MobListSchedulesByDoctorRepositoryImpl)
container
  .bind<IListAppointmentByCpfRepository>(
    TYPES.ListAppointmentByCpfRepositoryImpl
  )
  .to(ListAppointmentByCpfRepositoryImpl)
container
  .bind<ICreateAppointmentRepository>(TYPES.CreateAppointmentRepositoryImpl)
  .to(CreateAppointmentRepositoryImpl)
container
  .bind<IChangeEditableRepository>(TYPES.ChangeEditableRepositoryImpl)
  .to(ChangeEditableRepositoryImpl)
container
  .bind<IRemoveAppointmentRepository>(TYPES.RemoveAppointmentRepositoryImpl)
  .to(RemoveAppointmentRepositoryImpl)
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase)
container
  .bind<AuthenticateUserUseCase>(TYPES.AuthenticateUserUseCase)
  .to(AuthenticateUserUseCase)
container.bind<ListUsersUseCase>(TYPES.ListUsersUseCase).to(ListUsersUseCase)
container.bind<LogoutUserUseCase>(TYPES.LogoutUserUseCase).to(LogoutUserUseCase)
container
  .bind<AuthenticateAdminUseCase>(TYPES.AuthenticateAdminUseCase)
  .to(AuthenticateAdminUseCase)
container
  .bind<ListUserByIdUseCase>(TYPES.ListUserByIdUseCase)
  .to(ListUserByIdUseCase)
container.bind<RemoveUserUseCase>(TYPES.RemoveUserUseCase).to(RemoveUserUseCase)
container
  .bind<ChangeStatusUseCase>(TYPES.ChangeStatusUseCase)
  .to(ChangeStatusUseCase)
container
  .bind<ChangeDoctorStatusUseCase>(TYPES.ChangeDoctorStatusUseCase)
  .to(ChangeDoctorStatusUseCase)
container
  .bind<ChangeNameOrEmailUseCase>(TYPES.ChangeNameOrEmailUseCase)
  .to(ChangeNameOrEmailUseCase)
container
  .bind<ChangePlainAndCardUseCase>(TYPES.ChangePlainAndCardUseCase)
  .to(ChangePlainAndCardUseCase)
container
  .bind<ChangePasswordUseCase>(TYPES.ChangePasswordUseCase)
  .to(ChangePasswordUseCase)
container
  .bind<CreateDoctorUseCase>(TYPES.CreateDoctorUseCase)
  .to(CreateDoctorUseCase)
container
  .bind<RemoveDoctorUseCase>(TYPES.RemoveDoctorUseCase)
  .to(RemoveDoctorUseCase)
container
  .bind<ListDoctorsUseCase>(TYPES.ListDoctorsUseCase)
  .to(ListDoctorsUseCase)
container
  .bind<ListDoctorsBySpecialtyUseCase>(TYPES.ListDoctorsBySpecialtyUseCase)
  .to(ListDoctorsBySpecialtyUseCase)
container
  .bind<ListDoctorsByIdUseCase>(TYPES.ListDoctorsByIdUseCase)
  .to(ListDoctorsByIdUseCase)
container
  .bind<CreateScheduleUseCase>(TYPES.CreateScheduleUseCase)
  .to(CreateScheduleUseCase)
container
  .bind<RemoveScheduleUseCase>(TYPES.RemoveScheduleUseCase)
  .to(RemoveScheduleUseCase)
container
  .bind<ListSchedulesUseCase>(TYPES.ListSchedulesUseCase)
  .to(ListSchedulesUseCase)
container
  .bind<ListSchedulesByScheduledUseCase>(TYPES.ListSchedulesByScheduledUseCase)
  .to(ListSchedulesByScheduledUseCase)
container
  .bind<ListSchedulesByDoctorUseCase>(TYPES.ListSchedulesByDoctorUseCase)
  .to(ListSchedulesByDoctorUseCase)
container
  .bind<MobListSchedulesByDoctorUseCase>(TYPES.MobListSchedulesByDoctorUseCase)
  .to(MobListSchedulesByDoctorUseCase)
container
  .bind<ListAppointmentByCpfUseCase>(TYPES.ListAppointmentByCpfUseCase)
  .to(ListAppointmentByCpfUseCase)
container
  .bind<CreateAppointmentUseCase>(TYPES.CreateAppointmentUseCase)
  .to(CreateAppointmentUseCase)
container
  .bind<ChangeEditableUseCase>(TYPES.ChangeEditableUseCase)
  .to(ChangeEditableUseCase)
container
  .bind<RemoveAppointmentUseCase>(TYPES.RemoveAppointmentUseCase)
  .to(RemoveAppointmentUseCase)
container
  .bind<CreateUserController>(TYPES.CreateUserController)
  .to(CreateUserController)
container
  .bind<AuthenticateUserController>(TYPES.AuthenticateUserController)
  .to(AuthenticateUserController)
container
  .bind<ListUsersController>(TYPES.ListUsersController)
  .to(ListUsersController)
container
  .bind<LogoutUserController>(TYPES.LogoutUserController)
  .to(LogoutUserController)
container
  .bind<AuthenticateAdminController>(TYPES.AuthenticateAdminController)
  .to(AuthenticateAdminController)
container
  .bind<ListUserByIdController>(TYPES.ListUserByIdController)
  .to(ListUserByIdController)
container
  .bind<RemoveUserController>(TYPES.RemoveUserController)
  .to(RemoveUserController)
container
  .bind<ChangeStatusController>(TYPES.ChangeStatusController)
  .to(ChangeStatusController)
container
  .bind<ChangeDoctorStatusController>(TYPES.ChangeDoctorStatusController)
  .to(ChangeDoctorStatusController)
container
  .bind<ChangeNameOrEmailController>(TYPES.ChangeNameOrEmailController)
  .to(ChangeNameOrEmailController)
container
  .bind<ChangePlainAndCardController>(TYPES.ChangePlainAndCardController)
  .to(ChangePlainAndCardController)
container
  .bind<ChangePasswordController>(TYPES.ChangePasswordController)
  .to(ChangePasswordController)
container
  .bind<CreateDoctorController>(TYPES.CreateDoctorController)
  .to(CreateDoctorController)
container
  .bind<RemoveDoctorController>(TYPES.RemoveDoctorController)
  .to(RemoveDoctorController)
container
  .bind<ListDoctorsController>(TYPES.ListDoctorsController)
  .to(ListDoctorsController)
container
  .bind<ListDoctorsBySpecialtyController>(
    TYPES.ListDoctorsBySpecialtyController
  )
  .to(ListDoctorsBySpecialtyController)
container
  .bind<ListDoctorsByIdController>(TYPES.ListDoctorsByIdController)
  .to(ListDoctorsByIdController)
container
  .bind<CreateScheduleController>(TYPES.CreateScheduleController)
  .to(CreateScheduleController)
container
  .bind<RemoveScheduleController>(TYPES.RemoveScheduleController)
  .to(RemoveScheduleController)
container
  .bind<ListSchedulesControler>(TYPES.ListSchedulesControler)
  .to(ListSchedulesControler)
container
  .bind<ListSchedulesByScheduledController>(
    TYPES.ListSchedulesByScheduledController
  )
  .to(ListSchedulesByScheduledController)
container
  .bind<ListSchedulesByDoctorController>(TYPES.ListSchedulesByDoctorController)
  .to(ListSchedulesByDoctorController)
container
  .bind<MobListSchedulesByDoctorController>(
    TYPES.MobListSchedulesByDoctorController
  )
  .to(MobListSchedulesByDoctorController)
container
  .bind<ListAppointmentByCpfController>(TYPES.ListAppointmentByCpfController)
  .to(ListAppointmentByCpfController)
container
  .bind<CreateAppointmentController>(TYPES.CreateAppointmentController)
  .to(CreateAppointmentController)
container
  .bind<ChangeEditableController>(TYPES.ChangeEditableController)
  .to(ChangeEditableController)
container
  .bind<RemoveAppointmentController>(TYPES.RemoveAppointmentController)
  .to(RemoveAppointmentController)
container.bind<Validate>(TYPES.Validate).to(Validate)
container.bind<DataChecker>(TYPES.DataChecker).to(DataChecker)
container.bind<IHttpService>(TYPES.PrismaServer).to(PrismaServer)

export default container
