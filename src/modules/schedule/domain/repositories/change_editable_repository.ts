export interface IChangeEditableRepository {
  execute(id: string, editable: boolean): Promise<string>
}
