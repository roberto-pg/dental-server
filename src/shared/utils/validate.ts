import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import IHttpService from '../prisma/http_service'
import { TYPES } from '../ioc/types'
import container from '../ioc/inversify_config'

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
  plain?: string
  scheduled: boolean
  card?: string
  editable: boolean
}

@injectable()
class Validate {
  private _prismaServer: IHttpService
  constructor(
    @inject(TYPES.PrismaServer) private readonly prismaServer: IHttpService
  ) {
    this._prismaServer = prismaServer
  }

  async verifyUserEmail(email: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          email: email
        }
      })
    return user
  }

  async verifyUserCpf(cpf: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          cpf: cpf
        }
      })
    return user
  }

  async verifyUserId(id: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findUnique({
        where: {
          id: id
        }
      })
    return user
  }

  async verifyDoctorId(id: string) {
    const instanceValidate = container.resolve(Validate)

    const doctor = await instanceValidate._prismaServer
      .connectPrisma()
      .doctor.findUnique({
        where: {
          id: id
        }
      })
    return doctor
  }

  async verifyScheduleId(id: string) {
    const instanceValidate = container.resolve(Validate)

    const schedule = await instanceValidate._prismaServer
      .connectPrisma()
      .schedule.findUnique({
        where: {
          id: id
        }
      })
    return schedule
  }

  async verifyAppointmentId(id: string) {
    const instanceValidate = container.resolve(Validate)

    const appointment = await instanceValidate._prismaServer
      .connectPrisma()
      .schedule.findFirst({
        where: {
          id: id,
          scheduled: false
        }
      })

    return appointment
  }

  async verifyPlain(cpf: string, plain: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findFirst({
        where: {
          cpf,
          plain
        }
      })

    return user
  }

  async verifyCard(cpf: string, card: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findFirst({
        where: {
          cpf,
          card
        }
      })

    return user
  }

  async userIsActive(cpf: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findFirst({
        where: {
          cpf,
          active: true
        }
      })

    return user
  }

  async doctorIsActive(id: string) {
    const instanceValidate = container.resolve(Validate)

    const doctor = await instanceValidate._prismaServer
      .connectPrisma()
      .doctor.findFirst({
        where: {
          id,
          active: true
        }
      })

    return doctor
  }

  async getPatientName(cpf: string) {
    const instanceValidate = container.resolve(Validate)

    const user = await instanceValidate._prismaServer
      .connectPrisma()
      .user.findUnique({
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
    const instanceValidate = container.resolve(Validate)

    const scheduleResponse = []
    for (let i = 0; i < newSchedules.length; i++) {
      const result = await instanceValidate._prismaServer
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
