type AuthenticatedModel = {
  id?: string
  name?: string
  email?: string
  cpf: string
  password: string
  card: string
  plan: string
  active?: boolean
  admin?: boolean
}

export interface IAuthenticateUserRepository {
  execute(cpf: string): Promise<AuthenticatedModel>
}
