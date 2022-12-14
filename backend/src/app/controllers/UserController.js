import User from '../models/User'

class UserController {
  async store(req, res) {
    const { email } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    const { id, name } = await User.create(req.body)

    return res.json({ id, name, email })
  }

  async update(req, res) {
    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    if (oldPassword && !user.checkPassword(oldPassword)) {
      return res.status(401).json({ error: 'Password does not match.' })
    }

    const { id, name } = await user.update(req.body)

    return res.json({ id, name, email })
  }
}

export default new UserController()
