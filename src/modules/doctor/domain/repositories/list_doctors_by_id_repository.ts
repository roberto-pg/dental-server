type DoctorModel = {
  id: string
  name: string
  specialty: string
  image_url: string
  bio: string
  active: boolean
}

export interface IListDoctorsByIdRepository {
  execute(id: string): Promise<DoctorModel>
}
