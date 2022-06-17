export type UserModel = {
  id: string
  name: string
  email: string
  cpf: string
  password: string | undefined
  card: string | null
  plan: string
  active: boolean | null
  admin: boolean | null
}
