import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Mail from '../../lib/Mail'

class RegistrationMail {
  get key() {
    return 'RegistrationMail'
  }

  async handle({ data }) {
    const { registration } = data

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Confirmação de matrícula',
      template: 'registration',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        price: registration.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        date_end: format(
          parseISO(registration.end_date),
          "'Dia' dd 'de' MMMM'",
          {
            locale: ptBR,
          }
        ),
      },
    })
  }
}

export default new RegistrationMail()
