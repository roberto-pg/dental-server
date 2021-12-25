export interface IChangePlanAndCardRepository {
  execute(id: string, plan: string, card: string): Promise<string>
}
