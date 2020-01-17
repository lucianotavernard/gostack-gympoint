import { startOfHour, parseISO, isBefore, addMonths } from 'date-fns'

import Plan from '../models/Plan'
import Student from '../models/Student'
import Registration from '../models/Registration'

import Queue from '../../lib/Queue'
import RegistrationMail from '../jobs/RegistrationMail'

class CreateRegistrationService {
  async run({ student_id, plan_id, start_date }) {
    /**
     * Check if student_id exists
     */
    const student = await Student.findByPk(student_id)

    if (!student) throw new Error('Student not found')

    /**
     * Check if plan_id exists
     */
    const plan = await Plan.findByPk(plan_id)

    if (!plan) throw new Error('Plan not found')

    const dateStart = startOfHour(parseISO(start_date))

    if (isBefore(dateStart, new Date())) {
      throw new Error('Past dates are not permitted')
    }

    const dateEnd = addMonths(dateStart, plan.duration)
    const totalPrice = plan.price * plan.duration

    /**
     * Check end_date availability
     */
    const checkAvailability = await Registration.findOne({
      where: { student_id },
    })

    if (checkAvailability && !checkAvailability.past) {
      throw new Error('Student has an active plan')
    }

    await Registration.create({
      plan_id,
      student_id,
      start_date: dateStart,
      end_date: dateEnd,
      price: totalPrice,
    })

    const registration = await Registration.findOne({
      where: { plan_id, student_id },
      include: [
        {
          association: 'student',
          attributes: ['name', 'email'],
        },
        {
          association: 'plan',
          attributes: ['title'],
        },
      ],
    })

    await Queue.add(RegistrationMail.key, { registration })

    return registration
  }
}

export default new CreateRegistrationService()
