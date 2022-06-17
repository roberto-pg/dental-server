import { DoctorModel } from '../../../../shared/types'

export interface ICreateDoctorRepository {
  execute(
    name: string,
    specialty: string,
    image_url: string,
    bio: string
  ): Promise<DoctorModel>
}
