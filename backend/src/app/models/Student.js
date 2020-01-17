import Sequelize, { Model } from 'sequelize'
import { parseISO, differenceInYears } from 'date-fns'

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        born: Sequelize.DATEONLY,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return differenceInYears(new Date(), parseISO(this.born))
          },
        },
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Student
