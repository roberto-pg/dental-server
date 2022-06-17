import { UserModel } from '../../../../shared/types'

export interface ICreateUserRepository {
  execute(
    name: string,
    email: string,
    cpf: string,
    password: string,
    card: string,
    plan: string,
    active: boolean,
    admin: boolean
  ): Promise<UserModel>
}
