export type AuthenticatedModel = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  card: string | null
  plan: string
  active: boolean | null
  admin: boolean | null
}
