type DoctorModel = {
  name: string
  specialty: string
  image_url: string
  bio: string
}

export interface ICreateDoctorRepository {
  execute(
    name: string,
    specialty: string,
    image_url: string,
    bio: string
  ): Promise<DoctorModel>
}
