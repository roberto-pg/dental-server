export interface IChangeStatusRepository {
  execute(id: string, active: boolean): Promise<string>
}
