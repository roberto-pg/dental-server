export type ScheduleModel = {
  id: string
  doctor_id: string
  doctor_name: string
  specialty: string
  month_day: string | null
  week_day: string | null
  hour: string | null
  patient_name: string | null
  cpf: string | null
  plan: string | null
  scheduled: boolean | null
  card: string | null
  editable: boolean | null
}
