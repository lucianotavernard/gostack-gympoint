import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import { formatPrice } from '~/util/format';
import {
  createPlanRequest,
  updatePlanRequest,
} from '~/store/modules/plans/actions';

import ContentHeader from '~/components/ContentHeader';

import { Container, FormControl } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O nome é obrigatório'),
  duration: Yup.number().required('A duração é obrigatória'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function PlansForm({ match }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const [totalDuration, setTotalDuration] = useState(1);
  const [priceMonthly, setPriceMonthly] = useState(0);

  useEffect(() => {
    if (!match.params.id) return;

    async function loadStudent(id) {
      setLoading(true);

      const response = await api.get(`plans/${parseInt(id, 10)}`);
      const { price, duration } = response.data;

      setPlan(response.data);
      setPriceMonthly(price);
      setTotalDuration(duration);

      setLoading(false);
    }

    loadStudent(match.params.id);
  }, [match.params.id]);

  const pageTitle = useMemo(() => {
    return match.params.id ? 'Edição de plano' : 'Cadastro de plano';
  }, [match.params.id]);

  const totalPrice = useMemo(() => formatPrice(priceMonthly * totalDuration), [
    priceMonthly,
    totalDuration,
  ]);

  function handleCreate({ title, duration, price }, { resetForm }) {
    dispatch(createPlanRequest({ title, duration, price }));
    resetForm();
  }

  function handleUpdate({ title, duration, price }) {
    const { id } = match.params;

    dispatch(updatePlanRequest(id, { title, duration, price }));
  }

  if (loading) {
    return <div />;
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={plan}
        onSubmit={match.params.id ? handleUpdate : handleCreate}
      >
        <ContentHeader title={pageTitle}>
          <Link to="/plans">
            <MdKeyboardArrowLeft size={20} color="#fff" />
            Voltar
          </Link>

          <button type="submit">
            <MdCheck size={20} color="#fff" /> Salvar
          </button>
        </ContentHeader>

        <section>
          <label>Título do plano</label>
          <Input name="title" />

          <FormControl>
            <div>
              <label>Duração (em meses)</label>
              <Input
                type="number"
                name="duration"
                value={totalDuration}
                onChange={e => setTotalDuration(e.target.value)}
              />
            </div>

            <div>
              <label>Preço mensal</label>
              <Input
                type="number"
                name="price"
                step="0.01"
                min="0.00"
                value={priceMonthly}
                onChange={e => setPriceMonthly(e.target.value)}
              />
            </div>

            <div>
              <label>Preço total</label>
              <Input name="totalPrice" value={totalPrice} disabled />
            </div>
          </FormControl>
        </section>
      </Form>
    </Container>
  );
}

PlansForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
