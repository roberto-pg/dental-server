import { DoctorModel } from '../../../../shared/types'

export interface IListDoctorsRepository {
  execute(): Promise<DoctorModel[]>
}
