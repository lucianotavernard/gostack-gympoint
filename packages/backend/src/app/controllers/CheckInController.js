import { Op } from 'sequelize'
import { subDays } from 'date-fns'

import CheckIn from '../models/CheckIn'
import Student from '../models/Student'

class CheckInController {
  async index(req, res) {
    const { page = 1 } = req.query
    const { id: student_id } = req.params

    const student = await Student.findByPk(student_id)

    if (!student) return res.status(400).json({ error: 'Student not found' })

    const total = await CheckIn.count({ student_id })

    const checkins = await CheckIn.findAll({
      attributes: ['id', 'created_at'],
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

    return res.json({ checkins, total })
  }

  async store(req, res) {
    const { id: student_id } = req.params
    const student = await Student.findByPk(student_id)

    if (!student) return res.status(400).json({ error: 'Student not found' })

    const checkins = await CheckIn.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    })

    if (checkins.length > 4) {
      return res.status(400).json({
        error: 'Student has already reached the weekly checkpoint limit',
      })
    }

    const checkIn = await CheckIn.create({ student_id })

    const ownerSocket = req.conectedStudents[student_id]
    if (ownerSocket) req.io.to(ownerSocket).emit('CHECK_IN_NOTIFY', checkIn)

    return res.json(checkIn)
  }
}

export default new CheckInController()
