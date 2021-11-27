type DoctorModel = {
  name: string
  specialty: string
  image_url: string
  bio: string
}

export interface IListDoctorsBySpecialtyRepository {
  execute(specialty: string): Promise<DoctorModel[]>
}
