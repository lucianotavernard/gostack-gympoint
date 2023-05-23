import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    })

    return res.json(plans)
  }

  async show(req, res) {
    const { id } = req.params

    const plan = await Plan.findByPk(id, {
      attributes: ['id', 'title', 'duration', 'price'],
    })

    return res.json(plan)
  }

  async store(req, res) {
    const { title } = req.body

    const planExists = await Plan.findOne({
      where: {
        title,
      },
    })

    if (planExists) {
      return res.status(400).send({ error: 'Plan already exists' })
    }

    const plan = await Plan.create({ title, ...req.body })

    return res.json(plan)
  }

  async update(req, res) {
    const { id: plan_id } = req.params

    const plan = await Plan.findByPk(plan_id)

    if (!plan) return res.status(400).json({ error: 'Plan not found' })

    const { id, title, duration, price } = await plan.update(req.body)

    return res.json({ id, title, duration, price })
  }

  async delete(req, res) {
    const { id: plan_id } = req.params

    const plan = await Plan.findByPk(plan_id)

    if (!plan) return res.status(400).json({ error: 'Plan not found' })

    await plan.destroy({ where: { id: plan_id } })

    return res.json(plan)
  }
}

export default new PlanController()
