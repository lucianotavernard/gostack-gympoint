import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getHelpOrdersSuccess } from './actions';

export function* getHelpOders() {
  try {
    const response = yield call(api.get, 'help-orders');

    yield put(getHelpOrdersSuccess(response.data));
  } catch (error) {
    toast.error('Ocorreu algum erro ao listar os pedidos de auxílio');
  }
}

export function* updateHelpOrder({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.put, `help-orders/${id}/answer`, { answer });

    toast.success('Pedido de auxílio respondido com sucesso');
  } catch (error) {
    toast.error('Ocorreu algum erro ao responder o pedido de auxílio');
  }
}

export default all([
  takeLatest('@helpOrder/GET_REQUEST', getHelpOders),
  takeLatest('@helpOrder/UPDATE_REQUEST', updateHelpOrder),
]);
