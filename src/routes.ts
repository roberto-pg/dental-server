import { Router } from 'express'
import { protectedRoute } from './middleware/protected_route'
import CreateUserController from './modules/user/controller/create_user_controller'
import { CreateUserUseCase } from './modules/user/domain/usecases/create_user_usecase'
import { CreateUserRepositoryImpl } from './modules/user/datasource/create_user_repository_impl'
import { PrismaServer } from './shared/prisma/prisma_server'
import AuthenticateUserController from './modules/auth/controller/authenticate_user_controller'
import { AuthenticateUserUseCase } from './modules/auth/domain/usecases/authenticate_user_usecase'
import { AuthenticateUserRepositoryImpl } from './modules/auth/datasource/authenticate_user_repository_impl'
import { DataChecker } from './shared/utils/data_checker'
import { Validate } from './shared/utils/validate'
import { AuthenticateAdminRepositoryImpl } from './modules/auth/datasource/authenticate_admin_repository_impl'
import AuthenticateAdminController from './modules/auth/controller/authenticate_admin_controller'
import { AuthenticateAdminUseCase } from './modules/auth/domain/usecases/authenticate_admin_usecase'
import { LogoutUserRepositoryImpl } from './modules/auth/datasource/logout_user_repository_impl'
import { LogoutUserUseCase } from './modules/auth/domain/usecases/logout_user_usecase'
import { LogoutUserController } from './modules/auth/controller/logout_user_controller'
import { ListUsersRepositoryImpl } from './modules/user/datasource/list_users_repository.impl'
import { ListUsersUseCase } from './modules/user/domain/usecases/list_users_usecase'
import { ListUsersController } from './modules/user/controller/list_users_controller'
import { ListUserByIdRepositoryImpl } from './modules/user/datasource/list_user_by_id_repository_impl'
import { ListUserByIdUseCase } from './modules/user/domain/usecases/list_user_by_id_usecase'
import { ListUserByIdController } from './modules/user/controller/list_user_by_id_controller'
import { RemoveUserRepositoryImpl } from './modules/user/datasource/remove_user_repository_impl'
import { RemoveUserUseCase } from './modules/user/domain/usecases/remove_user_usecase'
import { RemoveUserController } from './modules/user/controller/remove_user_controller'
import { ChangeNameRepositoryImpl } from './modules/user/datasource/change_name_repository_impl'
import { ChangeNameUseCase } from './modules/user/domain/usecases/change_name_usecase'
import { ChangeNameController } from './modules/user/controller/change_name_controller'
import { ChangeEmailRepositoryImpl } from './modules/user/datasource/change_email_repository_impl'
import { ChangeEmailUseCase } from './modules/user/domain/usecases/change_email_usecase'
import { ChangeEmailController } from './modules/user/controller/change_email_controller'
import { ChangeStatusRepositoryImpl } from './modules/user/datasource/change_status_repository_impl'
import { ChangeStatusUseCase } from './modules/user/domain/usecases/change_status_usecase'
import { ChangeStatusController } from './modules/user/controller/change_status_controller'
import { ChangePlanAndCardRepositoryImpl } from './modules/user/datasource/change_plan_and_card_repository_impl'
import { ChangePlanAndCardUseCase } from './modules/user/domain/usecases/change_plan_and_card_usecase'
import { ChangePlanAndCardController } from './modules/user/controller/change_plan_and_card_controller'
import { ChangePasswordRepositoryImpl } from './modules/user/datasource/change_password_repository_impl'
import { ChangePasswordUseCase } from './modules/user/domain/usecases/change_password_usecase'
import { ChangePasswordController } from './modules/user/controller/change_password.controller'
import { CreateDoctorRepositoryImpl } from './modules/doctor/datasource/create_doctor_repository_impl'
import { CreateDoctorUseCase } from './modules/doctor/domain/usecases/create_doctor_usecase'
import { CreateDoctorController } from './modules/doctor/controller/create_doctor_controller'
import { ListDoctorsRepositoryImpl } from './modules/doctor/datasource/list_doctors_repository_impl'
import { ListDoctorsUseCase } from './modules/doctor/domain/usecases/list_doctors_usecase'
import { ListDoctorsController } from './modules/doctor/controller/list_doctors_controller'
import { ListDoctorsBySpecialtyRepositoryImpl } from './modules/doctor/datasource/list_doctors_by_specialty_repository_impl'
import { ListDoctorsBySpecialtyUseCase } from './modules/doctor/domain/usecases/list_doctors_by_specialty_usecase'
import { ListDoctorsBySpecialtyController } from './modules/doctor/controller/list_doctors_by_specialty_controller'
import { ListDoctorsByIdRepositoryImpl } from './modules/doctor/datasource/list_doctors_by_id_repository_impl'
import { ListDoctorsByIdUseCase } from './modules/doctor/domain/usecases/list_doctors_by_id_usecase'
import { ListDoctorsByIdController } from './modules/doctor/controller/list_doctors_by_id_controller'
import { ChangeDoctorStatusRepositoryImpl } from './modules/doctor/datasource/change_doctor_status_repository_impl'
import { ChangeDoctorStatusUseCase } from './modules/doctor/domain/usecases/change_doctor_status_usecase'
import { ChangeDoctorStatusController } from './modules/doctor/controller/change_doctor_status_controller'
import { RemoveDoctorRepositoryImpl } from './modules/doctor/datasource/remove_doctor_repository_impl'
import { RemoveDoctorUseCase } from './modules/doctor/domain/usecases/remove_doctor_usecase'
import { RemoveDoctorController } from './modules/doctor/controller/remove_doctor_controller'
import { CreateScheduleRepositoryImpl } from './modules/schedule/datasource/create_schedule_repository_impl'
import { CreateScheduleUseCase } from './modules/schedule/domain/usecases/create_schedule_usecase'
import { CreateScheduleController } from './modules/schedule/controller/create_schedule_controller'
import { ListSchedulesRepositoryImpl } from './modules/schedule/datasource/list_schedules_repository_impl'
import { ListSchedulesUseCase } from './modules/schedule/domain/usecases/list_schedules_usecase'
import { ListSchedulesController } from './modules/schedule/controller/list_schedules_controller'
import { RemoveScheduleRepositoryImpl } from './modules/schedule/datasource/remove_schedule_repository_impl'
import { RemoveScheduleUseCase } from './modules/schedule/domain/usecases/remove_schedule_usecase'
import { RemoveScheduleController } from './modules/schedule/controller/remove_schedule_controller'
import { CreateAppointmentRepositoryImpl } from './modules/schedule/datasource/create_appointment_repository_impl'
import { CreateAppointmentUseCase } from './modules/schedule/domain/usecases/create_appointment_usecase'
import { CreateAppointmentController } from './modules/schedule/controller/create_appointment_controller'
import { ChangeEditableRepositoryImpl } from './modules/schedule/datasource/change_editable_repository_impl'
import { ChangeEditableUseCase } from './modules/schedule/domain/usecases/change_editable_usecase'
import { ChangeEditableController } from './modules/schedule/controller/change_editable_controller'
import { RemoveAppointmentRepositoryImpl } from './modules/schedule/datasource/remove_appointment_repository.impl'
import { RemoveAppointmentUseCase } from './modules/schedule/domain/usecases/remove_appointment_usecase'
import { RemoveAppointmentController } from './modules/schedule/controller/remove_appointment_controller'
import { ListSchedulesByScheduledRepositoryImpl } from './modules/schedule/datasource/list_schedules_by_scheduled_repository_impl'
import { ListSchedulesByScheduledUseCase } from './modules/schedule/domain/usecases/lists_schedules_by_scheduled_usecase'
import { ListSchedulesByScheduledController } from './modules/schedule/controller/list_schedules_by_scheduled_controller'
import { ListSchedulesByDoctorRepositoryImpl } from './modules/schedule/datasource/list_schedules_by_doctor_repository_impl'
import { ListSchedulesByDoctorUseCase } from './modules/schedule/domain/usecases/list_schedules_by_doctor_usecase'
import { ListSchedulesByDoctorController } from './modules/schedule/controller/list_schedules_by_doctor_controller'
import { MobListSchedulesByDoctorRepositoryImpl } from './modules/schedule/datasource/mob_list_schedules_by_doctor_repository_impl'
import { MobListSchedulesByDoctorUseCase } from './modules/schedule/domain/usecases/mob_list_schedules_by_doctor_usecase'
import { MobListSchedulesByDoctorController } from './modules/schedule/controller/mob_list_schedules_by_doctor_controller'
import { ListAppointmentByCpfRepositoryImpl } from './modules/schedule/datasource/list_appointment_by_cpf_repository_impl'
import { ListAppointmentByCpfUseCase } from './modules/schedule/domain/usecases/list_appointment_by_cpf_usecase'
import { ListAppointmentByCpfController } from './modules/schedule/controller/list_appointment_by_cpf_controller'
const multer = require('multer')
const multerConfig = require('./middleware/multer')

const router = Router()

const prismaServer = new PrismaServer()
const dataChecker = new DataChecker()
const validate = new Validate(prismaServer)

const createUserRepository = new CreateUserRepositoryImpl(prismaServer)
const authenticateUserRepository = new AuthenticateUserRepositoryImpl(
  prismaServer
)
const authenticateAdminRepository = new AuthenticateAdminRepositoryImpl(
  prismaServer
)
const logoutUserRepository = new LogoutUserRepositoryImpl(prismaServer)
const listUsersRepository = new ListUsersRepositoryImpl(prismaServer)
const listUserByIdRepository = new ListUserByIdRepositoryImpl(prismaServer)
const removeUserRepository = new RemoveUserRepositoryImpl(prismaServer)
const changeNameRepository = new ChangeNameRepositoryImpl(prismaServer)
const changeEmailRepository = new ChangeEmailRepositoryImpl(prismaServer)
const changeStatusRepository = new ChangeStatusRepositoryImpl(prismaServer)
const changePlainAndCardRepository = new ChangePlanAndCardRepositoryImpl(
  prismaServer
)
const changePasswordRepository = new ChangePasswordRepositoryImpl(prismaServer)
const createDoctorRepository = new CreateDoctorRepositoryImpl(prismaServer)
const listDoctorsRepository = new ListDoctorsRepositoryImpl(prismaServer)
const listDoctorsBySpecialtyRepository =
  new ListDoctorsBySpecialtyRepositoryImpl(prismaServer)
const listDoctorsByIdRepository = new ListDoctorsByIdRepositoryImpl(
  prismaServer
)
const changeDoctorStatusRepository = new ChangeDoctorStatusRepositoryImpl(
  prismaServer
)
const removeDoctorRepository = new RemoveDoctorRepositoryImpl(prismaServer)
const createScheduleRepository = new CreateScheduleRepositoryImpl(prismaServer)
const listSchedulesRepository = new ListSchedulesRepositoryImpl(prismaServer)
const removeScheduleRepository = new RemoveScheduleRepositoryImpl(prismaServer)
const createAppointmentRepository = new CreateAppointmentRepositoryImpl(
  prismaServer
)
const changeEditableRepository = new ChangeEditableRepositoryImpl(prismaServer)
const removeAppointmentRepository = new RemoveAppointmentRepositoryImpl(
  prismaServer
)
const listSchedulesByScheduledRepository =
  new ListSchedulesByScheduledRepositoryImpl(prismaServer)
const listSchedulesByDoctorRepository = new ListSchedulesByDoctorRepositoryImpl(
  prismaServer
)
const mobListSchedulesByDoctorRepository =
  new MobListSchedulesByDoctorRepositoryImpl(prismaServer)
const listAppointmentByCpfRepository = new ListAppointmentByCpfRepositoryImpl(
  prismaServer
)

const createUserUseCase = new CreateUserUseCase(
  createUserRepository,
  dataChecker,
  validate
)
const authenticateUserUseCase = new AuthenticateUserUseCase(
  authenticateUserRepository,
  validate,
  dataChecker
)
const authenticateAdminUseCase = new AuthenticateAdminUseCase(
  authenticateAdminRepository,
  validate,
  dataChecker
)
const logoutUserUseCase = new LogoutUserUseCase(logoutUserRepository, validate)
const listUsersUseCase = new ListUsersUseCase(listUsersRepository)
const listUserByIdUseCase = new ListUserByIdUseCase(
  listUserByIdRepository,
  validate
)
const removeUserUseCase = new RemoveUserUseCase(removeUserRepository, validate)
const changeNameUseCase = new ChangeNameUseCase(
  changeNameRepository,
  validate,
  dataChecker
)
const changeEmailUseCase = new ChangeEmailUseCase(
  changeEmailRepository,
  validate,
  dataChecker
)
const changeStatusUseCase = new ChangeStatusUseCase(
  changeStatusRepository,
  validate
)
const changePlainAndCardUseCase = new ChangePlanAndCardUseCase(
  changePlainAndCardRepository,
  validate
)
const changePasswordUseCase = new ChangePasswordUseCase(
  changePasswordRepository,
  validate
)
const createDoctorUseCase = new CreateDoctorUseCase(createDoctorRepository)
const listDoctorsUseCase = new ListDoctorsUseCase(listDoctorsRepository)
const listDoctorsBySpecialtyUseCase = new ListDoctorsBySpecialtyUseCase(
  listDoctorsBySpecialtyRepository
)
const listDoctorsByIdUseCase = new ListDoctorsByIdUseCase(
  listDoctorsByIdRepository,
  validate
)
const changeDoctorStatusUseCase = new ChangeDoctorStatusUseCase(
  changeDoctorStatusRepository,
  validate
)
const removeDoctorUseCase = new RemoveDoctorUseCase(
  removeDoctorRepository,
  validate
)
const createScheduleUseCase = new CreateScheduleUseCase(
  createScheduleRepository,
  validate
)
const listSchedulesUseCase = new ListSchedulesUseCase(listSchedulesRepository)
const removeScheduleUseCase = new RemoveScheduleUseCase(
  removeScheduleRepository,
  validate
)
const createAppointmentUseCase = new CreateAppointmentUseCase(
  createAppointmentRepository,
  validate,
  dataChecker
)
const changeEditableUseCase = new ChangeEditableUseCase(
  changeEditableRepository,
  validate
)
const removeAppointmentUseCase = new RemoveAppointmentUseCase(
  removeAppointmentRepository,
  validate
)
const listSchedulesByScheduledUseCase = new ListSchedulesByScheduledUseCase(
  listSchedulesByScheduledRepository
)
const listSchedulesByDoctorUseCase = new ListSchedulesByDoctorUseCase(
  listSchedulesByDoctorRepository,
  validate
)
const mobListSchedulesByDoctorUseCase = new MobListSchedulesByDoctorUseCase(
  mobListSchedulesByDoctorRepository,
  validate
)
const listAppointmentByCpfUseCase = new ListAppointmentByCpfUseCase(
  listAppointmentByCpfRepository,
  dataChecker
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)
const createUserController = new CreateUserController(createUserUseCase)
const authenticateAdminController = new AuthenticateAdminController(
  authenticateAdminUseCase
)
const logoutUserController = new LogoutUserController(logoutUserUseCase)
const listUsersController = new ListUsersController(listUsersUseCase)
const listUserByIdController = new ListUserByIdController(listUserByIdUseCase)
const removeUserController = new RemoveUserController(removeUserUseCase)
const changeNameController = new ChangeNameController(changeNameUseCase)
const changeEmailController = new ChangeEmailController(changeEmailUseCase)
const changeStatusController = new ChangeStatusController(changeStatusUseCase)
const changePlainAndCardController = new ChangePlanAndCardController(
  changePlainAndCardUseCase
)
const changePasswordController = new ChangePasswordController(
  changePasswordUseCase
)
const createDoctorController = new CreateDoctorController(createDoctorUseCase)
const listDoctorsController = new ListDoctorsController(listDoctorsUseCase)
const listDoctorsBySpecialtyController = new ListDoctorsBySpecialtyController(
  listDoctorsBySpecialtyUseCase
)
const listDoctorsByIdController = new ListDoctorsByIdController(
  listDoctorsByIdUseCase
)
const changeDoctorStatusController = new ChangeDoctorStatusController(
  changeDoctorStatusUseCase
)
const removeDoctorController = new RemoveDoctorController(removeDoctorUseCase)
const createScheduleController = new CreateScheduleController(
  createScheduleUseCase
)
const listSchedulesController = new ListSchedulesController(
  listSchedulesUseCase
)
const removeScheduleController = new RemoveScheduleController(
  removeScheduleUseCase
)
const createAppointmentController = new CreateAppointmentController(
  createAppointmentUseCase
)
const changeEditableController = new ChangeEditableController(
  changeEditableUseCase
)
const removeAppointmentController = new RemoveAppointmentController(
  removeAppointmentUseCase
)
const listSchedulesByScheduledController =
  new ListSchedulesByScheduledController(listSchedulesByScheduledUseCase)
const listSchedulesByDoctorController = new ListSchedulesByDoctorController(
  listSchedulesByDoctorUseCase
)
const mobListSchedulesByDoctorController =
  new MobListSchedulesByDoctorController(mobListSchedulesByDoctorUseCase)
const listAppointmentByCpfController = new ListAppointmentByCpfController(
  listAppointmentByCpfUseCase
)

router.post('/authenticate-user', authenticateUserController.handle)
router.post('/authenticate-admin', authenticateAdminController.handle)
router.post('/logout/:id', protectedRoute, logoutUserController.handle)

router.post('/users', createUserController.handle)
router.get('/users', protectedRoute, listUsersController.handle)
router.get('/users/:id', protectedRoute, listUserByIdController.handle)
router.delete('/delete-user/:id', protectedRoute, removeUserController.handle)
router.patch('/user-name', protectedRoute, changeNameController.handle)
router.patch('/user-email', protectedRoute, changeEmailController.handle)
router.patch('/user-active', protectedRoute, changeStatusController.handle)
router.patch(
  '/users/plain-and-card',
  protectedRoute,
  changePlainAndCardController.handle
)
router.patch('/user-password', protectedRoute, changePasswordController.handle)

router.post(
  '/doctors',
  multer(multerConfig).single('imageUrl'),
  protectedRoute,
  createDoctorController.handle
)
router.get('/doctors', protectedRoute, listDoctorsController.handle)
router.get(
  '/doctors-specialty/:specialty',
  protectedRoute,
  listDoctorsBySpecialtyController.handle
)
router.get('/doctor-id/:id', protectedRoute, listDoctorsByIdController.handle)
router.patch(
  '/doctor-active',
  protectedRoute,
  changeDoctorStatusController.handle
)
router.delete(
  '/delete-doctor/:id',
  protectedRoute,
  removeDoctorController.handle
)

router.post(
  '/schedules/:doctorId',
  protectedRoute,
  createScheduleController.handle
)
router.get('/schedules', protectedRoute, listSchedulesController.handle)
router.delete(
  '/delete-schedule/:id',
  protectedRoute,
  removeScheduleController.handle
)
router.patch(
  '/create-appointment',
  protectedRoute,
  createAppointmentController.handle
)
router.patch(
  '/schedule-editable',
  protectedRoute,
  changeEditableController.handle
)
router.patch(
  '/destroy-appointment',
  protectedRoute,
  removeAppointmentController.handle
)
router.get(
  '/schedules-by-scheduled/:scheduled',
  protectedRoute,
  listSchedulesByScheduledController.handle
)
router.get(
  '/schedules-by-doctor/:doctorId/:yearAndMonth',
  protectedRoute,
  listSchedulesByDoctorController.handle
)
router.get(
  '/schedules-by-doctor-mobile/:doctorId',
  protectedRoute,
  mobListSchedulesByDoctorController.handle
)
router.get(
  '/appointments-by-cpf',
  protectedRoute,
  listAppointmentByCpfController.handle
)

export { router }
