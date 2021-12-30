export interface ICreateAppointmentRepository {
  execute(
    scheduleId: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean
  ): Promise<string>
}
