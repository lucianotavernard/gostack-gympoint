import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import {
  getRegistrationsRequest,
  removeRegistrationRequest,
} from '~/store/modules/registrations/actions';

import Modal from '~/components/Modal';
import Empty from '~/components/Empty';
import ContentHeader from '~/components/ContentHeader';

import { Container } from './styles';

export default function Registrations() {
  const dispatch = useDispatch();
  const registrations = useSelector(state => state.registrations.data);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  useEffect(() => {
    dispatch(getRegistrationsRequest());
  }, [dispatch]);

  useEffect(() => {
    setOpenModal(false);
  }, [registrations]);

  function handleOpenModal(registration) {
    setSelectedRegistration(registration);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleSubmit() {
    const { id } = selectedRegistration;

    dispatch(removeRegistrationRequest(id));
  }

  return (
    <Container>
      <ContentHeader title="Gerenciando matrículas">
        <Link to="/registrations/new">
          <MdAdd size={20} color="#fff" />
          Cadastrar
        </Link>
      </ContentHeader>

      <section>
        {registrations ? (
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Plano</th>
                <th>Início</th>
                <th>Término</th>
                <th>Ativa</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.student.name}</td>
                  <td>{registration.plan.title}</td>
                  <td>{registration.startDateFormatted}</td>
                  <td>{registration.endDateFormatted}</td>
                  <td align="center">
                    <MdCheckCircle
                      size={20}
                      color={registration.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <Link to={`/registrations/${registration.id}/edit`}>
                      editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenModal(registration)}
                    >
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
          <p>Deseja remover a matrícula: #{selectedRegistration.id}?</p>
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
