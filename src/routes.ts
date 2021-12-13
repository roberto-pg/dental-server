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
// const multer = require('multer')
// const multerConfig = require('./middleware/multer')

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

router.post('/authenticate-user', authenticateUserController.handle)
router.post('/authenticate-admin', authenticateAdminController.handle)
router.post('/logout/:id', protectedRoute, logoutUserController.handle)

router.post('/users', createUserController.handle)
router.get('/users', protectedRoute, listUsersController.handle)
router.get('/users/:id', protectedRoute, listUserByIdController.handle)
router.delete('/delete-user/:id', protectedRoute, removeUserController.handle)

// router.patch('/user-active', protectedRoute, changeStatusController.handle)

// router.patch(
//   '/users/name-or-email',
//   protectedRoute,
//   changeNameOrEmailController.handle
// )

// router.patch(
//   '/users/plain-and-card',
//   protectedRoute,
//   changePlainAndCardController.handle
// )

// router.patch('/users-password', protectedRoute, changePasswordController.handle)

// router.post(
//   '/doctors',
//   multer(multerConfig).single('imageUrl'),
//   protectedRoute,
//   createDoctorControler.handle
// )

// router.get('/doctors', protectedRoute, listDoctorsController.handle)

// router.delete(
//   '/delete-doctor/:id',
//   protectedRoute,
//   removeDoctorController.handle
// )

// router.get(
//   '/doctors-specialty/:specialty',
//   protectedRoute,
//   listDoctorsBySpecialtyController.handle
// )

// router.get('/doctor-id/:id', protectedRoute, listDoctorsByIdController.handle)

// router.patch(
//   '/doctor-active',
//   protectedRoute,
//   changeDoctorStatusController.handle
// )

// router.post(
//   '/schedules/:doctorId',
//   protectedRoute,
//   createScheduleController.handle
// )

// router.get('/schedules', protectedRoute, listSchedulesController.handle)

// router.get(
//   '/schedules-by-scheduled/:scheduled',
//   protectedRoute,
//   listSchedulesByScheduledController.handle
// )

// router.get(
//   '/schedules-by-doctor/:doctorId/:yearAndMonth',
//   protectedRoute,
//   listSchedulesByDoctorController.handle
// )

// router.get(
//   '/schedules-by-doctor-mobile/:doctorId',
//   protectedRoute,
//   mobListSchedulesByDoctorController.handle
// )

// router.delete(
//   '/delete-schedule/:id',
//   protectedRoute,
//   removeScheduleController.handle
// )

// router.get(
//   '/appointments-by-cpf',
//   protectedRoute,
//   listAppointmentByCpfController.handle
// )

// router.patch(
//   '/create-appointment',
//   protectedRoute,
//   createAppointmentController.handle
// )

// router.patch(
//   '/schedule-editable',
//   protectedRoute,
//   changeEditableController.handle
// )

// router.patch(
//   '/destroy-appointment',
//   protectedRoute,
//   removeAppointmentController.handle
// )

export { router }
