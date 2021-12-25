export interface IChangeNameRepository {
  execute(id: string, name: string): Promise<string>
}
