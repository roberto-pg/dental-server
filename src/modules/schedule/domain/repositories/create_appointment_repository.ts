export interface ICreateAppointmentRepository {
  execute(
    id: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean
  ): Promise<string>
}
