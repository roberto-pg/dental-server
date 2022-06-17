import { UserModel } from '../../../../shared/types'

export interface IListUserByIdRepository {
  execute(id: string): Promise<UserModel>
}
