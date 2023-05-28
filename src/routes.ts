import { Router } from 'express'
import { protectedRoute } from './middleware/protected_route'
import { authenticateAdminController, authenticateUserController, logoutUserController } from './modules/factories/auth'
import {
  changeDoctorStatusController,
  createDoctorController,
  listDoctorByIdController,
  listDoctorsBySpecialtyController,
  listDoctorsController,
  removeDoctorController
} from './modules/factories/doctor'
import {
  changeEditableController,
  createAppointmentController,
  createScheduleController,
  listAppointmentByCpfController,
  listSchedulesByDoctorController,
  listSchedulesByScheduledController,
  listSchedulesController,
  mobListSchedulesByDoctorController,
  removeAppointmentController,
  removeScheduleController
} from './modules/factories/schedule'
import {
  changeEmailController,
  changeNameController,
  changePasswordController,
  changePlanAndCardController,
  changeStatusController,
  createUserController,
  listUserByIdController,
  listUsersController,
  removeUserController
} from './modules/factories/user'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require('multer')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multerConfig = require('./middleware/multer')

const router = Router()

// Authenticate routes:
router.post('/authenticate-user', authenticateUserController().handle)
router.post('/authenticate-admin', authenticateAdminController().handle)
router.post('/logout/:id', protectedRoute, logoutUserController().handle)

// User routes:
router.post('/users', createUserController().handle)
router.get('/users', protectedRoute, listUsersController().handle)
router.get('/user-id/:id', protectedRoute, listUserByIdController().handle)
router.delete('/delete-user/:id', protectedRoute, removeUserController().handle)
router.patch('/user-name', protectedRoute, changeNameController().handle)
router.patch('/user-email', protectedRoute, changeEmailController().handle)
router.patch('/user-active', protectedRoute, changeStatusController().handle)
router.patch('/user-plan-and-card', protectedRoute, changePlanAndCardController().handle)
router.patch('/user-password', protectedRoute, changePasswordController().handle)

// Doctor routes
router.post('/doctors', multer(multerConfig).single('imageUrl'), protectedRoute, createDoctorController().handle)
router.get('/doctors', protectedRoute, listDoctorsController().handle)
router.get('/doctors-specialty/:specialty', protectedRoute, listDoctorsBySpecialtyController().handle)
router.get('/doctor-id/:id', protectedRoute, listDoctorByIdController().handle)
router.patch('/doctor-active', protectedRoute, changeDoctorStatusController().handle)
router.delete('/delete-doctor/:id', protectedRoute, removeDoctorController().handle)

// Schedule routes:
router.post('/schedules/:doctorId', protectedRoute, createScheduleController().handle)
router.get('/schedules', protectedRoute, listSchedulesController().handle)
router.delete('/delete-schedule/:id', protectedRoute, removeScheduleController().handle)
router.patch('/create-appointment', protectedRoute, createAppointmentController().handle)
router.patch('/schedule-editable', protectedRoute, changeEditableController().handle)
router.patch('/destroy-appointment', protectedRoute, removeAppointmentController().handle)
router.get('/schedules-by-scheduled/:scheduled', protectedRoute, listSchedulesByScheduledController().handle)
router.get('/schedules-by-doctor/:doctorId/:yearAndMonth', protectedRoute, listSchedulesByDoctorController().handle)
router.get('/schedules-by-doctor-mobile/:doctorId', protectedRoute, mobListSchedulesByDoctorController().handle)
router.get('/appointments-by-cpf', protectedRoute, listAppointmentByCpfController().handle)

export { router }
