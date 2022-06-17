import { DoctorModel } from '../../../../shared/types'

export interface IListDoctorByIdRepository {
  execute(id: string): Promise<DoctorModel | null>
}
