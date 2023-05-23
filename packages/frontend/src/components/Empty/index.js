import React from 'react';

import empty from '~/assets/empty.svg';

import { Container } from './styles';

export default function Empty() {
  return (
    <Container>
      <img src={empty} alt="No data" />
      <p>Sem registros</p>
    </Container>
  );
}
