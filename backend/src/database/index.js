import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Plan from '../app/models/Plan'
import Student from '../app/models/Student'
import CheckIn from '../app/models/CheckIn'
import Registration from '../app/models/Registration'
import HelpOrder from '../app/models/HelpOrder'

const models = [User, Plan, Student, CheckIn, Registration, HelpOrder]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
