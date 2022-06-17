import { UserModel } from '../../../../shared/types'

export interface IListUsersRepository {
  execute(): Promise<UserModel[]>
}
