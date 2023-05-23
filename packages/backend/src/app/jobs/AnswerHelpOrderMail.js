import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import Mail from '../../lib/Mail'

class AnswerHelpOrderMail {
  get key() {
    return 'AnswerHelpOrderMail'
  }

  async handle({ data }) {
    const { helpOrder } = data

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Resposta ao pedido de auxílio',
      template: 'help_order',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(
          parseISO(helpOrder.answer_at),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: ptBR,
          }
        ),
      },
    })
  }
}

export default new AnswerHelpOrderMail()
