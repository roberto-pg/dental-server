import { DoctorModel } from '../../../../shared/types'

export interface IListDoctorsBySpecialtyRepository {
  execute(specialty: string): Promise<DoctorModel[]>
}
