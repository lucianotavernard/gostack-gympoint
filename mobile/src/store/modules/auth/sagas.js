import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'students_sessions', { id });

    const { user } = response.data;

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure());

    Alert.alert('Falha na autenticação', 'Por favor verifique seu ID');
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
