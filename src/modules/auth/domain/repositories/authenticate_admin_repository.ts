type AuthenticatedModel = {
  id?: string
  name?: string
  email?: string
  cpf: string
  password: string
  card?: string
  plain?: string
  active?: boolean
  admin?: boolean
}

export interface IAuthenticateAdminRepository {
  execute(cpf: string): Promise<AuthenticatedModel>
}
