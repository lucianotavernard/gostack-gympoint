import HelpOrder from '../models/HelpOrder'

import Queue from '../../lib/Queue'
import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail'

class AnswerHelpOrderService {
  async run({ help_order_id, answer }) {
    /**
     * Check if help_order_id exists
     */
    const helpOrder = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          association: 'student',
          attributes: ['name', 'email'],
        },
      ],
    })

    if (!helpOrder) throw new Error('Help order not found')

    helpOrder.answer = answer
    helpOrder.answer_at = new Date()

    await helpOrder.save()

    await Queue.add(AnswerHelpOrderMail.key, { helpOrder })

    return helpOrder
  }
}

export default new AnswerHelpOrderService()
