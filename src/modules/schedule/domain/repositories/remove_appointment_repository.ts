export interface IRemoveAppointmentRepository {
  execute(
    id: string,
    patientName: string,
    cpf: string,
    plan: string,
    card: string,
    scheduled: boolean,
    editable: boolean
  ): Promise<string>
}
