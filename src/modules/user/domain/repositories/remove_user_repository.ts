export interface IRemoveUserRepository {
  execute(id: string): Promise<string>
}
