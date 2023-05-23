import Student from '../models/Student'
import HelpOrder from '../models/HelpOrder'

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query
    const { id: student_id } = req.params

    const student = await Student.findByPk(student_id)

    if (!student) return res.status(400).json({ error: 'Student not found' })

    const total = await HelpOrder.count({ student_id })

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id,
      },
      attributes: ['id', 'question', 'answer', 'created_at', 'answer_at'],
      include: [
        {
          association: 'student',
          attributes: ['name', 'email', 'born', 'age', 'weight', 'height'],
        },
      ],
      order: ['created_at'],
      limit: 10,
      offset: (page - 1) * 10,
    })

    return res.json({ helpOrders, total })
  }

  async store(req, res) {
    const { id: student_id } = req.params

    const student = await Student.findByPk(student_id)

    if (!student) return res.status(400).json({ error: 'Student not found' })

    const helpOrder = await HelpOrder.create({ student_id, ...req.body })

    return res.json(helpOrder)
  }
}

export default new HelpOrderController()
