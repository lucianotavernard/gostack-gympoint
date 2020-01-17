import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { getStudentsSuccess } from './actions';

export function* getStudents({ payload }) {
  try {
    const { search } = payload;

    const response = yield call(api.get, `students?q=${search}`);

    yield put(getStudentsSuccess(response.data));
  } catch (error) {
    toast.error('Ocorreu algum erro ao listar os alunos');
  }
}

export function* createStudent({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'students', data);

    toast.success('Aluno criado com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum erro ao listar os alunos');
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, data } = payload;

    yield call(api.put, `students/${id}`, data);

    toast.success('Aluno atualizado com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum erro ao atualizar aluno');
  }
}

export function* removeStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `students/${id}`);

    toast.success('Aluno removido com sucesso!');
  } catch (error) {
    toast.error('Ocorreu algum erro ao remover aluno');
  }
}

export default all([
  takeLatest('@student/GET_REQUEST', getStudents),
  takeLatest('@student/CREATE_REQUEST', createStudent),
  takeLatest('@student/UPDATE_REQUEST', updateStudent),
  takeLatest('@student/REMOVE_REQUEST', removeStudent),
]);
