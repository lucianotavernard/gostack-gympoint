import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-vertical.png';

import { Container, Logo, Form, Input, SubmitForm } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Logo source={logo} />
      <Form>
        <Input
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          returnKeyType="send"
          onChangeText={setId}
          value={id}
        />

        <SubmitForm onPress={handleSubmit} label="Entrar no sistema" />
      </Form>
    </Container>
  );
}
