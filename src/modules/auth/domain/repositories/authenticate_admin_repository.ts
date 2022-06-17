import { AuthenticatedModel } from '../../../../shared/types'

export interface IAuthenticateAdminRepository {
  execute(cpf: string): Promise<AuthenticatedModel | null>
}
