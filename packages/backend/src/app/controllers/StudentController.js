import { Op } from 'sequelize'

import Student from '../models/Student'

class StudentController {
  async index(req, res) {
    const { page = 1, q: name = '' } = req.query

    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'born', 'age', 'weight', 'height'],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(students)
  }

  async show(req, res) {
    const { id } = req.params

    const student = await Student.findByPk(id, {
      attributes: ['id', 'name', 'email', 'born', 'age', 'weight', 'height'],
    })

    return res.json(student)
  }

  async store(req, res) {
    const { email } = req.body

    if (await Student.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'Student already exists.' })
    }

    const { id, name, born, weight, height } = await Student.create(req.body)

    return res.json({ id, name, email, born, weight, height })
  }

  async update(req, res) {
    const { email } = req.body
    const { id: student_id } = req.params

    const student = await Student.findByPk(student_id)

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' })
    }

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } })

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' })
      }
    }

    const { id, name, born, weight, height } = await student.update(req.body)

    return res.json({ id, name, email, born, weight, height })
  }

  async delete(req, res) {
    const { id } = req.params

    const student = await Student.findByPk(id)

    if (!student) return res.status(400).json({ error: 'Student not found' })

    await student.destroy({ where: { id } })

    return res.json(student)
  }
}

export default new StudentController()
