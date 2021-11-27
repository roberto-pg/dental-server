export interface IChangePasswordRepository {
  execute(id: string, password: string): Promise<string>
}
