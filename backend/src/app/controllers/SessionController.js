import Student from '../models/Student'

class SessionController {
  async store(req, res) {
    const { id } = req.body

    const user = await Student.findByPk(id, {
      attributes: ['id', 'name', 'email'],
    })

    if (!user) return res.status(400).json({ error: 'Student not found' })

    return res.json({ user })
  }
}

export default new SessionController()
