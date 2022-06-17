export type FilteredScheduleModel = {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  monthDay: string | null
  weekDay: string | null
  hour: string | null
  patientName: string | null
  cpf: string | null
  plan: string | null
  card: string | null
  scheduled: boolean | null
  editable: boolean | null
}
