export interface IChangePlainAndCardRepository {
  execute(id: string, plain: string, card: string): Promise<string>
}
