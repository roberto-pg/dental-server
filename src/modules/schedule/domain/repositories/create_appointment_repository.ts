export interface ICreateAppointmentRepository {
  execute(
    id: string,
    patientName: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean
  ): Promise<string>
}
