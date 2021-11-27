export interface IChangeNameOrEmailRepository {
  execute(id: string, name: string, email: string): Promise<string>
}
