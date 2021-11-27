type UserModel = {
  name: string
  email: string
  cpf: string
  password?: string
  card: string
  plain: string
  active: boolean
  admin: boolean
}

export interface IListUserByIdRepository {
  execute(id: string): Promise<UserModel>
}
