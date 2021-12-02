type DoctorModel = {
  id: string
  name: string
  specialty: string
  image_url: string
  bio: string
  active: boolean
}

export interface IListDoctorsRepository {
  execute(): Promise<DoctorModel[]>
}
