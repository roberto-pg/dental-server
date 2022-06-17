import { AuthenticatedModel } from '../../../../shared/types'

export interface IAuthenticateUserRepository {
  execute(cpf: string): Promise<AuthenticatedModel | null>
}
