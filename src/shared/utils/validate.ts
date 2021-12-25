import IHttpService from '../prisma/http_service'

type ScheduleModel = {
  id?: string
  doctor_id: string
  doctor_name: string
  specialty: string
  month_day: string
  week_day: string
  hour: string
  patient_name?: string
  cpf?: string
  plan?: string
  scheduled: boolean
  card?: string
  editable: boolean
}

class Validate {
  private _prismaServer: IHttpService
  constructor(prismaServer: IHttpService) {
    this._prismaServer = prismaServer
  }

  async verifyUserEmail(email: string) {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        email: email
      }
    })
    return user
  }

  async verifyUserCpf(cpf: string) {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        cpf: cpf
      }
    })
    return user
  }

  async verifyUserId(id: string) {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        id: id
      }
    })
    return user
  }

  async verifyDoctorId(id: string) {
    const doctor = await this._prismaServer.connectPrisma().doctor.findUnique({
      where: {
        id: id
      }
    })
    return doctor
  }

  async verifyScheduleId(id: string) {
    const schedule = await this._prismaServer
      .connectPrisma()
      .schedule.findUnique({
        where: {
          id: id
        }
      })
    return schedule
  }

  async verifyAppointmentId(id: string) {
    const appointment = await this._prismaServer
      .connectPrisma()
      .schedule.findFirst({
        where: {
          id: id,
          scheduled: false
        }
      })

    return appointment
  }

  async verifyPlain(cpf: string, plan: string) {
    const user = await this._prismaServer.connectPrisma().user.findFirst({
      where: {
        cpf,
        plan
      }
    })

    return user
  }

  async verifyCard(cpf: string, card: string) {
    const user = await this._prismaServer.connectPrisma().user.findFirst({
      where: {
        cpf,
        card
      }
    })

    return user
  }

  async userIsActive(cpf: string) {
    const user = await this._prismaServer.connectPrisma().user.findFirst({
      where: {
        cpf,
        active: true
      }
    })

    return user
  }

  async doctorIsActive(id: string) {
    const doctor = await this._prismaServer.connectPrisma().doctor.findFirst({
      where: {
        id,
        active: true
      }
    })

    return doctor
  }

  async getPatientName(cpf: string) {
    const user = await this._prismaServer.connectPrisma().user.findUnique({
      where: {
        cpf
      }
    })

    return user.name
  }

  async schedulesAlreadyExists(
    newSchedules: ScheduleModel[],
    parsedMonthDay: string,
    doctor_id: string
  ) {
    const scheduleResponse = []
    for (let i = 0; i < newSchedules.length; i++) {
      const result = await this._prismaServer
        .connectPrisma()
        .schedule.findMany({
          where: {
            doctor_id: doctor_id,
            month_day: parsedMonthDay,
            hour: newSchedules[i].hour
          },
          select: {
            month_day: true,
            hour: true
          }
        })
      scheduleResponse.push(...result)
    }

    return scheduleResponse
  }
}

export { Validate }
