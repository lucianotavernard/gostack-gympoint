import React from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import logo from '~/assets/logo-horizontal.png';

import { Container, Logo } from './styles';

export default function Header({ hasGoBack }) {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Container hasGoBack={hasGoBack}>
        <Logo source={logo} />
      </Container>
    </>
  );
}

Header.propTypes = {
  hasGoBack: PropTypes.bool,
};

Header.defaultProps = {
  hasGoBack: false,
};
