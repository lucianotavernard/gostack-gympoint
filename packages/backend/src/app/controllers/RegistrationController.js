import Registration from '../models/Registration'

import CreateRegistrationService from '../services/CreateRegistrationService'

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query

    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          association: 'student',
          attributes: ['id', 'name'],
        },
        {
          association: 'plan',
          attributes: ['id', 'title'],
        },
      ],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(registrations)
  }

  async show(req, res) {
    const { id } = req.params

    const registration = await Registration.findByPk(id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          association: 'student',
          attributes: ['id', 'name'],
        },
        {
          association: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    })

    return res.json(registration)
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body

    const registration = await CreateRegistrationService.run({
      student_id,
      plan_id,
      start_date,
    })

    return res.json(registration)
  }

  async update(req, res) {
    const { id: registrationId } = req.params

    const registration = await Registration.findByPk(registrationId)

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' })
    }

    const registrationUpdated = await registration.update(req.body)

    const { id, student_id, plan_id, start_date } = registrationUpdated

    return res.json({ id, student_id, plan_id, start_date })
  }

  async delete(req, res) {
    const { id: registrationId } = req.params

    const registration = await Registration.findByPk(registrationId)

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found' })
    }

    await registration.destroy({ where: { id: registrationId } })

    return res.json(registration)
  }
}

export default new RegistrationController()
