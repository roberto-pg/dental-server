export interface ILogoutUserRepository {
  execute(id: string): Promise<string>
}
