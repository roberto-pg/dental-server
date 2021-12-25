export interface IChangeEmailRepository {
  execute(id: string, email: string): Promise<string>
}
