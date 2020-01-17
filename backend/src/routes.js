import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import GymSessionController from './app/controllers/GymSessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import CheckInController from './app/controllers/CheckInController'
import RegistrationController from './app/controllers/RegistrationController'
import HelpOrderController from './app/controllers/HelpOrderController'
import GymHelpOrderController from './app/controllers/GymHelpOrderController'

import validateUserUpdate from './app/validators/UserUpdate'
import validateGymSessionStore from './app/validators/GymSessionStore'
import validateSessionStore from './app/validators/SessionStore'
import validateStudentStore from './app/validators/StudentStore'
import validateStudentUpdate from './app/validators/StudentUpdate'
import validatePlanStore from './app/validators/PlanStore'
import validatePlanUpdate from './app/validators/PlanUpdate'
import validateRegistrationStore from './app/validators/RegistrationStore'
import validateRegistrationUpdate from './app/validators/RegistrationUpdate'
import validateHelpOrderStore from './app/validators/HelpOrderStore'
import validateHelpOrderUpdate from './app/validators/HelpOrderUpdate'

import authMiddleware from './app/middlewares/auth'

const routes = Router()

routes.post('/sessions', validateGymSessionStore, GymSessionController.store)
routes.post('/students_sessions', validateSessionStore, SessionController.store)

routes.get('/students/:id/checkins', CheckInController.index)
routes.post('/students/:id/checkins', CheckInController.store)

routes.get('/students/:id/help-orders', HelpOrderController.index)
routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  HelpOrderController.store
)

routes.use(authMiddleware)

routes.put('/users', validateUserUpdate, UserController.update)

routes.get('/students', StudentController.index)
routes.get('/students/:id', StudentController.show)
routes.post('/students', validateStudentStore, StudentController.store)
routes.put('/students/:id', validateStudentUpdate, StudentController.update)
routes.delete('/students/:id', StudentController.delete)

routes.get('/plans', PlanController.index)
routes.get('/plans/:id', PlanController.show)
routes.post('/plans', validatePlanStore, PlanController.store)
routes.put('/plans/:id', validatePlanUpdate, PlanController.update)
routes.delete('/plans/:id', PlanController.delete)

routes.get('/registrations', RegistrationController.index)
routes.get('/registrations/:id', RegistrationController.show)
routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationController.store
)
routes.put(
  '/registrations/:id',
  validateRegistrationUpdate,
  RegistrationController.update
)
routes.delete('/registrations/:id', RegistrationController.delete)

routes.get('/help-orders', GymHelpOrderController.index)
routes.put(
  '/help-orders/:id/answer',
  validateHelpOrderUpdate,
  GymHelpOrderController.update
)

export default routes
