import HelpOrder from '../models/HelpOrder'

import AnswerHelpOrderService from '../services/AnswerHelpOrderService'

class GymHelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query

    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      attributes: ['id', 'question', 'created_at'],
      include: [
        {
          association: 'student',
          attributes: ['name', 'email', 'born', 'age', 'weight', 'height'],
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(helpOrders)
  }

  async update(req, res) {
    const { answer } = req.body
    const { id: help_order_id } = req.params

    const helpOrder = await AnswerHelpOrderService.run({
      help_order_id,
      answer,
    })

    return res.json(helpOrder)
  }
}

export default new GymHelpOrderController()
