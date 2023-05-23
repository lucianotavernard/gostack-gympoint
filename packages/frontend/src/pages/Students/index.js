import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import {
  getStudentsRequest,
  removeStudentRequest,
} from '~/store/modules/students/actions';

import Modal from '~/components/Modal';
import Empty from '~/components/Empty';
import ContentHeader from '~/components/ContentHeader';

import { Container, InputControl } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.data);

  const [search, setSearch] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getStudentsRequest(search));
  }, [dispatch, search]);

  useEffect(() => {
    setOpenModal(false);
  }, [students]);

  function handleOpenModal(student) {
    setSelectedStudent(student);
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleSubmit() {
    const { id } = selectedStudent;

    dispatch(removeStudentRequest(id));
  }

  return (
    <Container>
      <ContentHeader title="Gerenciando alunos">
        <Link to="/students/new">
          <MdAdd size={20} color="#fff" />
          Cadastrar
        </Link>

        <InputControl>
          <MdSearch size={16} color="#999" />
          <Input
            name="search"
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar aluno"
          />
        </InputControl>
      </ContentHeader>

      <section>
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Idade</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/students/${student.id}/edit`}>editar</Link>
                    <button
                      type="button"
                      onClick={() => handleOpenModal(student)}
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
          <p>Deseja remover o aluno: {selectedStudent.name}?</p>
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
