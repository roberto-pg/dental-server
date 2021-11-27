export interface IRemoveDoctorRepository {
  execute(id: string): Promise<string>
}
