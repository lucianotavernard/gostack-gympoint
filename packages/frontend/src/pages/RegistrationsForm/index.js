import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { addMonths, format, parseISO } from 'date-fns';

import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';
import ContentHeader from '~/components/ContentHeader';

import api from '~/services/api';
import { formatPrice } from '~/util/format';
import {
  createRegistrationRequest,
  updateRegistrationRequest,
} from '~/store/modules/registrations/actions';

import { Container, FormControl } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number('Aluno inválido').required('O aluno é obrigatório'),
  plan_id: Yup.number('Plano inválido').required('O plano é obrigatório'),
  start_date: Yup.date('Data inválida').required(
    'A data inícial é obrigatória'
  ),
});

export default function RegistrationForm({ match }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState(null);

  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }

    async function loadStudents() {
      const response = await api.get('students');
      setStudents(response.data);
    }

    loadPlans();
    loadStudents();
  }, []);

  useEffect(() => {
    if (!match.params.id || !plans.length || !students.length) return;

    async function loadRegistration(id) {
      setLoading(true);

      const response = await api.get(`registrations/${parseInt(id, 10)}`);
      const { plan, student, start_date } = response.data;

      const planSelected = plans.find(item => item.id === plan.id);
      const studentSelected = students.find(item => item.id === student.id);

      setRegistration({ ...response.data, student_id: student, plan_id: plan });
      setSelectedStudent(studentSelected);
      setSelectedPlan(planSelected);
      setStartDate(parseISO(start_date));

      setLoading(false);
    }

    loadRegistration(match.params.id);
  }, [match.params.id, plans, students]);

  const pageTitle = useMemo(() => {
    return match.params.id ? 'Edição de matrícula' : 'Cadastro de matrícula';
  }, [match.params.id]);

  const endDate = useMemo(() => {
    if (!startDate || !selectedPlan) return '';

    return format(addMonths(startDate, selectedPlan.duration), 'dd/MM/yyy');
  }, [selectedPlan, startDate]);

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return '';

    return formatPrice(selectedPlan.duration * selectedPlan.price);
  }, [selectedPlan]);

  function handleCreate(data, { resetForm }) {
    dispatch(createRegistrationRequest(data));
    resetForm();
  }

  function handleUpdate(data) {
    const { id } = match.params;

    dispatch(updateRegistrationRequest(id, data));
  }

  if (loading) {
    return <div />;
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={registration}
        onSubmit={match.params.id ? handleUpdate : handleCreate}
      >
        <ContentHeader title={pageTitle}>
          <Link to="/registrations">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Link>

          <button type="submit">
            <MdCheck size={20} color="#fff" /> Salvar
          </button>
        </ContentHeader>

        <section>
          <label>Aluno</label>
          <Select
            name="student_id"
            placeholder="Buscar aluno"
            options={students}
            getOptionLabel={option => option.name}
            onChange={value => setSelectedStudent(value)}
            value={selectedStudent}
          />

          <FormControl>
            <div>
              <label>Plano</label>
              <Select
                name="plan_id"
                placeholder="Buscar plano"
                options={plans}
                getOptionLabel={option => option.title}
                onChange={value => setSelectedPlan(value)}
                value={selectedPlan}
              />
            </div>

            <div>
              <label>Data de início</label>
              <DatePicker
                name="start_date"
                dateFormat="dd/MM/yyyy"
                placeholderText="01/01/1990"
                onChange={date => setStartDate(date)}
                selected={startDate}
              />
            </div>

            <div>
              <label>Data de término</label>
              <Input name="endDate" value={endDate} disabled />
            </div>

            <div>
              <label>Valor final</label>
              <Input name="totalPrice " value={totalPrice} disabled />
            </div>
          </FormControl>
        </section>
      </Form>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
