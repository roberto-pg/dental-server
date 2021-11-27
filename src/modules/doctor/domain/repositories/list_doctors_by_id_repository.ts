type DoctorModel = {
  name: string
  specialty: string
  image_url: string
  bio: string
}

export interface IListDoctorsByIdRepository {
  execute(id: string): Promise<DoctorModel[]>
}
