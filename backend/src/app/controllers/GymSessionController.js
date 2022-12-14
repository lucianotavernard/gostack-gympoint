import User from '../models/User'

class GymSessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) return res.status(400).json({ error: 'User not found' })

    if (!user.checkPassword(password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const { id, name } = user

    return res.json({
      user: { id, name, email },
      token: user.generateToken(user),
    })
  }
}

export default new GymSessionController()
