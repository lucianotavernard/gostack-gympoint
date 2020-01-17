import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { getPlansSuccess } from './actions';

export function* getPlans() {
  try {
    const response = yield call(api.get, 'plans');

    const repositoryData = response.data.map(plan => ({
      ...plan,
      priceFormatted: formatPrice(plan.price),
      durationFormatted: `${plan.duration} ${
        plan.duration > 1 ? 'meses' : 'mês'
      }`,
    }));

    yield put(getPlansSuccess(repositoryData));
  } catch (error) {
    toast.error('Ocorreu algum erro ao listar os planos');
  }
}

export function* createPlan({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'plans', data);

    toast.success('Plano criado com sucesso');
  } catch (error) {
    toast.error('Ocorreu algum ao criar novo plano');
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, data } = payload;

    yield call(api.put, `plans/${id}`, data);

    toast.success('Plano atualizado com sucesso');
  } catch (error) {
    toast.error('Ocorreu algum ao atualizar plano');
  }
}

export function* removePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    toast.success('Matrícula removida com sucesso');
  } catch (error) {
    toast.error('Ocorreu algum erro ao remover matrícula');
  }
}

export default all([
  takeLatest('@plan/GET_REQUEST', getPlans),
  takeLatest('@plan/CREATE_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_REQUEST', updatePlan),
  takeLatest('@plan/REMOVE_REQUEST', removePlan),
]);
