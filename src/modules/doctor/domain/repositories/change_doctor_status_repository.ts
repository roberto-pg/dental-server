export interface IChangeDoctorStatusRepository {
  execute(id: string, active: boolean): Promise<string>
}
