const TYPES = {
  CreateUserRepositoryImpl: Symbol.for('CreateUserRepositoryImpl'),
  AuthenticateUserRepositoryImpl: Symbol.for('AuthenticateUserRepositoryImpl'),
  ListUsersRepositoryImpl: Symbol.for('ListUsersRepositoryImpl'),
  LogoutUserRepositoryImpl: Symbol.for('LogoutUserRepositoryImpl'),
  AuthenticateAdminRepositoryImpl: Symbol.for(
    'AuthenticateAdminRepositoryImpl'
  ),
  ListUserByIdRepositoryImpl: Symbol.for('ListUserByIdRepositoryImpl'),
  RemoveUserRepositoryImpl: Symbol.for('RemoveUserRepositoryImpl'),
  ChangeStatusRepositoryImpl: Symbol.for('ChangeStatusRepositoryImpl'),
  ChangeNameOrEmailRepositoryImpl: Symbol.for(
    'ChangeNameOrEmailRepositoryImpl'
  ),
  ChangePlainAndCardRepositoryImpl: Symbol.for(
    'ChangePlainAndCardRepositoryImpl'
  ),
  ChangePasswordRepositoryImpl: Symbol.for('ChangePasswordRepositoryImpl'),
  CreateDoctorRepositoryImpl: Symbol.for('CreateDoctorRepositoryImpl'),
  RemoveDoctorRepositoryImpl: Symbol.for('RemoveDoctorRepositoryImpl'),
  ListDoctorsRepositoryImpl: Symbol.for('ListDoctorsRepositoryImpl'),
  ListDoctorsBySpecialtyRepositoryImpl: Symbol.for(
    'ListDoctorsBySpecialtyRepositoryImpl'
  ),
  ListDoctorsByIdRepositoryImpl: Symbol.for('ListDoctorsByIdRepositoryImpl'),
  CreateScheduleRepositoryImpl: Symbol.for('CreateScheduleRepositoryImpl'),
  RemoveScheduleRepositoryImpl: Symbol.for('RemoveScheduleRepositoryImpl'),
  ListSchedulesRepositoryImpl: Symbol.for('ListSchedulesRepositoryImpl'),
  ListSchedulesByScheduledRepositoryImpl: Symbol.for(
    'ListSchedulesByScheduledRepositoryImpl'
  ),
  ListSchedulesByDoctorRepositoryImpl: Symbol.for(
    'ListSchedulesByDoctorRepositoryImpl'
  ),
  MobListSchedulesByDoctorRepositoryImpl: Symbol.for(
    'MobListSchedulesByDoctorRepositoryImpl'
  ),
  ListAppointmentByCpfRepositoryImpl: Symbol.for(
    'ListAppointmentByCpfRepositoryImpl'
  ),
  CreateAppointmentRepositoryImpl: Symbol.for(
    'CreateAppointmentRepositoryImpl'
  ),
  ChangeEditableRepositoryImpl: Symbol.for('ChangeEditableRepositoryImpl'),
  RemoveAppointmentRepositoryImpl: Symbol.for(
    'RemoveAppointmentRepositoryImpl'
  ),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  AuthenticateUserUseCase: Symbol.for('AuthenticateUserUseCase'),
  ListUsersUseCase: Symbol.for('ListUsersUseCase'),
  LogoutUserUseCase: Symbol.for('LogoutUserUseCase'),
  AuthenticateAdminUseCase: Symbol.for('AuthenticateAdminUseCase'),
  ListUserByIdUseCase: Symbol.for('ListUserByIdUseCase'),
  RemoveUserUseCase: Symbol.for('RemoveUserUseCase'),
  ChangeStatusUseCase: Symbol.for('ChangeStatusUseCase'),
  ChangeNameOrEmailUseCase: Symbol.for('ChangeNameOrEmailUseCase'),
  ChangePlainAndCardUseCase: Symbol.for('ChangePlainAndCardUseCase'),
  ChangePasswordUseCase: Symbol.for('ChangePasswordUseCase'),
  CreateDoctorUseCase: Symbol.for('CreateDoctorUseCase'),
  RemoveDoctorUseCase: Symbol.for('RemoveDoctorUseCase'),
  ListDoctorsUseCase: Symbol.for('ListDoctorsUseCase'),
  ListDoctorsBySpecialtyUseCase: Symbol.for('ListDoctorsBySpecialtyUseCase'),
  ListDoctorsByIdUseCase: Symbol.for('ListDoctorsByIdUseCase'),
  CreateScheduleUseCase: Symbol.for('CreateScheduleUseCase'),
  RemoveScheduleUseCase: Symbol.for('RemoveScheduleUseCase'),
  ListSchedulesUseCase: Symbol.for('ListSchedulesUseCase'),
  ListSchedulesByScheduledUseCase: Symbol.for(
    'ListSchedulesByScheduledUseCase'
  ),
  ListSchedulesByDoctorUseCase: Symbol.for('ListSchedulesByDoctorUseCase'),
  MobListSchedulesByDoctorUseCase: Symbol.for(
    'MobListSchedulesByDoctorUseCase'
  ),
  ListAppointmentByCpfUseCase: Symbol.for('ListAppointmentByCpfUseCase'),
  CreateAppointmentUseCase: Symbol.for('CreateAppointmentUseCase'),
  ChangeEditableUseCase: Symbol.for('ChangeEditableUseCase'),
  RemoveAppointmentUseCase: Symbol.for('RemoveAppointmentUseCase'),
  CreateUserController: Symbol.for('CreateUserController'),
  AuthenticateUserController: Symbol.for('AuthenticateUserController'),
  ListUsersController: Symbol.for('ListUsersController'),
  LogoutUserController: Symbol.for('LogoutUserController'),
  AuthenticateAdminController: Symbol.for('AuthenticateAdminController'),
  ListUserByIdController: Symbol.for('ListUserByIdController'),
  RemoveUserController: Symbol.for('RemoveUserController'),
  ChangeStatusController: Symbol.for('ChangeStatusController'),
  ChangeNameOrEmailController: Symbol.for('ChangeNameOrEmailController'),
  ChangePlainAndCardController: Symbol.for('ChangePlainAndCardController'),
  ChangePasswordController: Symbol.for('ChangePasswordController'),
  CreateDoctorController: Symbol.for('CreateDoctorController'),
  RemoveDoctorController: Symbol.for('RemoveDoctorController'),
  ListDoctorsController: Symbol.for('ListDoctorsController'),
  ListDoctorsBySpecialtyController: Symbol.for(
    'ListDoctorsBySpecialtyController'
  ),
  ListDoctorsByIdController: Symbol.for('ListDoctorsByIdController'),
  CreateScheduleController: Symbol.for('CreateScheduleController'),
  RemoveScheduleController: Symbol.for('RemoveScheduleController'),
  ListSchedulesControler: Symbol.for('ListSchedulesControler'),
  ListSchedulesByScheduledController: Symbol.for(
    'ListSchedulesByScheduledController'
  ),
  ListSchedulesByDoctorController: Symbol.for(
    'ListSchedulesByDoctorController'
  ),
  MobListSchedulesByDoctorController: Symbol.for(
    'MobListSchedulesByDoctorController'
  ),
  ListAppointmentByCpfController: Symbol.for('ListAppointmentByCpfController'),
  CreateAppointmentController: Symbol.for('CreateAppointmentController'),
  ChangeEditableController: Symbol.for('ChangeEditableController'),
  RemoveAppointmentController: Symbol.for('RemoveAppointmentController'),
  Validate: Symbol.for('Validate'),
  DataChecker: Symbol.for('DataChecker'),
  PrismaServer: Symbol.for('PrismaServer')
}

export { TYPES }
