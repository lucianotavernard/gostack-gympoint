import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import { getRegistrationsSuccess } from './actions';

export function* getRegistrations() {
  try {
    const response = yield call(api.get, 'registrations');

    const repositoryData = response.data.map(registration => ({
      ...registration,
      startDateFormatted: format(
        parseISO(registration.start_date),
        "dd 'de' MMMM 'de' Y",
        {
          locale: ptBR,
        }
      ),
      endDateFormatted: format(
        parseISO(registration.end_date),
        "dd 'de' MMMM 'de' Y",
        {
          locale: ptBR,
        }
      ),
    }));

    yield put(getRegistrationsSuccess(repositoryData));
  } catch (error) {
    toast.error('Ocorreu algum erro ao listar as matrículas');
  }
}

export function* createRegistration({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'registrations', data);

    toast.success('Matrícula criada com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum ao criar nova matrícula');
  }
}

export function* updateRegistration({ payload }) {
  try {
    const { id, data } = payload;

    yield call(api.put, `registrations/${id}`, data);

    toast.success('Matrícula atualizada com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum erro ao atualizar matrícula');
  }
}

export function* removeRegistration({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    toast.success('Matrícula removida com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum erro ao remover a matrícula');
  }
}

export default all([
  takeLatest('@registration/GET_REQUEST', getRegistrations),
  takeLatest('@registration/CREATE_REQUEST', createRegistration),
  takeLatest('@registration/UPDATE_REQUEST', updateRegistration),
  takeLatest('@registration/REMOVE_REQUEST', removeRegistration),
]);
