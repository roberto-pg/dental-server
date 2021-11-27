type DoctorModel = {
  name: string
  specialty: string
  image_url: string
  bio: string
}

export interface IListDoctorsRepository {
  execute(): Promise<DoctorModel[]>
}
