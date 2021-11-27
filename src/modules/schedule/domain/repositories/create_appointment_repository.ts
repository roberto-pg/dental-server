export interface ICreateAppointmentRepository {
  execute(
    id: string,
    cpf: string,
    plain: string,
    card: string,
    scheduled: boolean
  ): Promise<string>
}
