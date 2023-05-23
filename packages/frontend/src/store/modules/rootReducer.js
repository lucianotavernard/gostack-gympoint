import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import plans from './plans/reducer';
import students from './students/reducer';
import registrations from './registrations/reducer';
import helpOrders from './helpOrders/reducer';

export default combineReducers({
  auth,
  user,
  plans,
  students,
  registrations,
  helpOrders,
});
