import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import plans from './plans/sagas';
import students from './students/sagas';
import registrations from './registrations/sagas';
import helpOrders from './helpOrders/sagas';

export default function* rootSaga() {
  return yield all([auth, user, plans, students, registrations, helpOrders]);
}
