type ScheduleModel = {
  doctor_id: string
  doctor_name: string
  specialty: string
  month_day: string
  week_day: string
  hour: string
  patient_name?: string
  cpf?: string
  plan?: string
  card?: string
  scheduled: boolean
  editable: boolean
}

export interface IListSchedulesByDoctorRepository {
  execute(doctorId: string, currentDay: Date): Promise<ScheduleModel[]>
}
