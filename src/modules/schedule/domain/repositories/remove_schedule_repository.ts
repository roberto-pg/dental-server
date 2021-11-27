export interface IRemoveScheduleRepository {
  execute(id: string): Promise<string>
}
