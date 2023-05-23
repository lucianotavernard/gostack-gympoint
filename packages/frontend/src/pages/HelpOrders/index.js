import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  getHelpOrdersRequest,
  updateHelpOrder,
} from '~/store/modules/helpOrders/actions';

import Modal from '~/components/Modal';
import Empty from '~/components/Empty';
import ContentHeader from '~/components/ContentHeader';

import { Container } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('A responta é obrigatória'),
});

export default function HelpOrders() {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.helpOrders.data);

  const [openModal, setOpenModal] = useState(false);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState(false);

  useEffect(() => {
    dispatch(getHelpOrdersRequest());
  }, [dispatch]);

  useEffect(() => {
    setOpenModal(false);
  }, [helpOrders]);

  function handleOpenModal(helpOrder) {
    setSelectedHelpOrder(helpOrder);
    setOpenModal(true);
  }

  function handleSubmit({ answer }) {
    dispatch(updateHelpOrder(selectedHelpOrder.id, answer));
  }

  return (
    <Container>
      <ContentHeader title="Pedidos de auxílio" />

      <section>
        {helpOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {helpOrders.map(helpOrder => (
                <tr key={helpOrder.id}>
                  <td>{helpOrder.student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleOpenModal(helpOrder)}
                    >
                      responder
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
        <Modal size="big">
          <Form schema={schema} onSubmit={handleSubmit}>
            <label>Pergunta do aluno</label>
            <p>{selectedHelpOrder.question}</p>

            <label>Sua resposta</label>
            <Input name="answer" multiline placeholder="Escreva sua resposta" />

            <button type="submit">Responder aluno</button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
