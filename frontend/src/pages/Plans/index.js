import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { getPlansRequest, removePlanRequest } from '~/store/modules/plans/actions';

import Modal from '~/components/Modal';
import Empty from '~/components/Empty';
import ContentHeader from '~/components/ContentHeader';

import { Container } from './styles';

export default function Plans() {
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plans.data);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getPlansRequest());
  }, [dispatch]);

  useEffect(() => {
    setOpenModal(false);
  }, [plans]);

  function handleOpenModal(student) {
    setSelectedStudent(student);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleSubmit() {
    const { id } = selectedPlan;

    dispatch(removePlanRequest(id));
  }

  return (
    <Container>
      <ContentHeader title="Gerenciando planos">
        <Link to="/plans/new">
          <MdAdd size={20} color="#fff" />
          Cadastrar
        </Link>
      </ContentHeader>

      <section>
        {plans.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Duração</th>
                <th>Valor Mensal</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <Link to={`/plans/${plan.id}/edit`}>editar</Link>
                    <button type="button" onClick={() => handleOpenModal(plan)}>
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty />
        )}
      </section>

      {openModal && (
        <Modal>
          <p>Deseja remover o plano: {selectedPlan.title}?</p>
          <button type="button" onClick={handleSubmit}>
            Confirmar
          </button>

          <button type="button" onClick={handleCloseModal}>
            Cancelar
          </button>
        </Modal>
      )}
    </Container>
  );
}
