import 'reflect-metadata'
import { Router } from 'express'
import { protectedRoute } from './middleware/protected_route'
import CreateUserController from './modules/user/controller/create_user_controller'
import container from './shared/ioc/inversify_config'
import { TYPES } from './shared/ioc/types'
import AuthenticateUserController from './modules/auth/controller/authenticate_user_controller'
import { ListUsersController } from './modules/user/controller/list_users_controller'
import { LogoutUserController } from './modules/auth/controller/logout_user_controller'
import AuthenticateAdminController from './modules/auth/controller/authenticate_admin_controller'
import { ListUserByIdController } from './modules/user/controller/list_user_by_id_controller'
import { RemoveUserController } from './modules/user/controller/remove_user_controller'
import { ChangeStatusController } from './modules/user/controller/change_status_controller'
import { ChangeNameOrEmailController } from './modules/user/controller/change_name_or_email_controller'
import { ChangePlainAndCardController } from './modules/user/controller/change_plain_and_card_controller'
import { ChangePasswordController } from './modules/user/controller/change_password.controller'
import { CreateDoctorController } from './modules/doctor/controller/create_doctor_controller'
import { RemoveDoctorController } from './modules/doctor/controller/remove_doctor_controller'
import { ListDoctorsController } from './modules/doctor/controller/list_doctors_controller'
import { ListDoctorsBySpecialtyController } from './modules/doctor/controller/list_doctors_by_specialty_controller'
import { ListDoctorsByIdController } from './modules/doctor/controller/list_doctors_by_id_controller'
import { CreateScheduleController } from './modules/schedule/controller/create_schedule_controller'
import { RemoveScheduleController } from './modules/schedule/controller/remove_schedule_controller'
import { ListSchedulesControler } from './modules/schedule/controller/list_schedules_controller'
import { ListSchedulesByScheduledController } from './modules/schedule/controller/list_schedules_by_scheduled_controller'
import { ListSchedulesByDoctorController } from './modules/schedule/controller/list_schedules_by_doctor_controller'
import { MobListSchedulesByDoctorController } from './modules/schedule/controller/mob_list_schedules_by_doctor_controller'
import { ListAppointmentByCpfController } from './modules/schedule/controller/list_appointment_by_cpf_controller'
import { CreateAppointmentController } from './modules/schedule/controller/create_appointment_controller'
import { ChangeEditableController } from './modules/schedule/controller/change_editable_controller'
import { RemoveAppointmentController } from './modules/schedule/controller/remove_appointment_controller'
const multer = require('multer')
const multerConfig = require('./middleware/multer')

const createUserController = container.get<CreateUserController>(
  TYPES.CreateUserController
)
const authenticateUserController = container.get<AuthenticateUserController>(
  TYPES.AuthenticateUserController
)
const listUsersController = container.get<ListUsersController>(
  TYPES.ListUsersController
)
const logoutUserController = container.get<LogoutUserController>(
  TYPES.LogoutUserController
)
const authenticateAdminController = container.get<AuthenticateAdminController>(
  TYPES.AuthenticateAdminController
)
const listUserByIdController = container.get<ListUserByIdController>(
  TYPES.ListUserByIdController
)
const removeUserController = container.get<RemoveUserController>(
  TYPES.RemoveUserController
)
const changeStatusController = container.get<ChangeStatusController>(
  TYPES.ChangeStatusController
)
const changeNameOrEmailController = container.get<ChangeNameOrEmailController>(
  TYPES.ChangeNameOrEmailController
)
const changePlainAndCardController =
  container.get<ChangePlainAndCardController>(
    TYPES.ChangePlainAndCardController
  )
const changePasswordController = container.get<ChangePasswordController>(
  TYPES.ChangePasswordController
)
const createDoctorControler = container.get<CreateDoctorController>(
  TYPES.CreateDoctorController
)
const removeDoctorController = container.get<RemoveDoctorController>(
  TYPES.RemoveDoctorController
)
const listDoctorsController = container.get<ListDoctorsController>(
  TYPES.ListDoctorsController
)
const listDoctorsBySpecialtyController =
  container.get<ListDoctorsBySpecialtyController>(
    TYPES.ListDoctorsBySpecialtyController
  )
const listDoctorsByIdController = container.get<ListDoctorsByIdController>(
  TYPES.ListDoctorsByIdController
)
const createScheduleController = container.get<CreateScheduleController>(
  TYPES.CreateScheduleController
)
const removeScheduleController = container.get<RemoveScheduleController>(
  TYPES.RemoveScheduleController
)
const listSchedulesController = container.get<ListSchedulesControler>(
  TYPES.ListSchedulesControler
)
const listSchedulesByScheduledController =
  container.get<ListSchedulesByScheduledController>(
    TYPES.ListSchedulesByScheduledController
  )
const listSchedulesByDoctorController =
  container.get<ListSchedulesByDoctorController>(
    TYPES.ListSchedulesByDoctorController
  )
const mobListSchedulesByDoctorController =
  container.get<MobListSchedulesByDoctorController>(
    TYPES.MobListSchedulesByDoctorController
  )
const listAppointmentByCpfController =
  container.get<ListAppointmentByCpfController>(
    TYPES.ListAppointmentByCpfController
  )
const createAppointmentController = container.get<CreateAppointmentController>(
  TYPES.CreateAppointmentController
)
const changeEditableController = container.get<ChangeEditableController>(
  TYPES.ChangeEditableController
)
const removeAppointmentController = container.get<RemoveAppointmentController>(
  TYPES.RemoveAppointmentController
)

const router = Router()

router.post('/users', createUserController.handle)

router.post('/authenticate-user', authenticateUserController.handle)

router.post('/authenticate-admin', authenticateAdminController.handle)

router.get('/users', protectedRoute, listUsersController.handle)

router.post('/logout/:id', protectedRoute, logoutUserController.handle)

router.get('/users/:id', protectedRoute, listUserByIdController.handle)

router.delete('/delete-users/:id', protectedRoute, removeUserController.handle)

router.patch('/users-active', protectedRoute, changeStatusController.handle)

router.patch(
  '/users/name-or-email',
  protectedRoute,
  changeNameOrEmailController.handle
)

router.patch(
  '/users/plain-and-card',
  protectedRoute,
  changePlainAndCardController.handle
)

router.patch('/users-password', protectedRoute, changePasswordController.handle)

router.post(
  '/doctors',
  multer(multerConfig).single('imageUrl'),
  protectedRoute,
  createDoctorControler.handle
)

router.get('/doctors', protectedRoute, listDoctorsController.handle)

router.delete(
  '/delete-doctor/:id',
  protectedRoute,
  removeDoctorController.handle
)

router.get(
  '/doctors-specialty/:specialty',
  protectedRoute,
  listDoctorsBySpecialtyController.handle
)

router.get('/doctor-id/:id', protectedRoute, listDoctorsByIdController.handle)

router.post(
  '/schedules/:doctorId',
  protectedRoute,
  createScheduleController.handle
)

router.get('/schedules', protectedRoute, listSchedulesController.handle)

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

router.delete(
  '/delete-schedule/:id',
  protectedRoute,
  removeScheduleController.handle
)

router.get(
  '/appointment-by-cpf',
  protectedRoute,
  listAppointmentByCpfController.handle
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

export { router }
