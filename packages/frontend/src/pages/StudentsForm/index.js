import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { parseISO } from 'date-fns';

import api from '~/services/api';
import {
  createStudentRequest,
  updateStudentRequest,
} from '~/store/modules/students/actions';

import DatePicker from '~/components/DatePicker';
import ContentHeader from '~/components/ContentHeader';

import { Container, FormControl } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('O email é obrigatório'),
  born: Yup.date().required('A data de nascimento é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function StudentForm({ match }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [born, setBorn] = useState(null);

  useEffect(() => {
    if (!match.params.id) return;

    async function loadStudent(id) {
      setLoading(true);

      const response = await api.get(`students/${parseInt(id, 10)}`);
      const { born: studentBorn } = response.data;

      setStudent(response.data);
      setBorn(parseISO(studentBorn));

      setLoading(false);
    }

    loadStudent(match.params.id);
  }, [match.params.id]);

  const pageTitle = useMemo(() => {
    return match.params.id ? 'Edição de aluno' : 'Cadastro de aluno';
  }, [match.params.id]);

  function handleCreate(data, { resetForm }) {
    dispatch(createStudentRequest(data));
    resetForm();
  }

  function handleUpdate(data) {
    const { id } = match.params;

    dispatch(updateStudentRequest(id, data));
  }

  if (loading) {
    return <div />;
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={student}
        onSubmit={match.params.id ? handleUpdate : handleCreate}
      >
        <ContentHeader title={pageTitle}>
          <Link to="/dashboard">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Link>

          <button type="submit">
            <MdCheck size={20} color="#fff" /> Salvar
          </button>
        </ContentHeader>

        <section>
          <label>Nome Completo</label>
          <Input name="name" placeholder="John Doe" />

          <label>Endereço de E-mail</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <FormControl>
            <div>
              <label>Data de Nascimento</label>
              <DatePicker
                name="born"
                selected={born}
                dateFormat="dd/MM/yyyy"
                onChange={date => setBorn(date)}
              />
            </div>

            <div>
              <label>Peso (em Kg)</label>
              <Input name="weight" />
            </div>

            <div>
              <label>Altura</label>
              <Input name="height" />
            </div>
          </FormControl>
        </section>
      </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
