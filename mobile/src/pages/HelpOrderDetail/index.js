import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Content,
  Box,
  Header,
  Title,
  Time,
  Description,
} from './styles';

export default function HelpOrderDetail({ navigation }) {
  const orderDetail = navigation.getParam('orderDetail');

  return (
    <>
      <Container>
        <Content>
          <Box>
            <Header>
              <Title>Pergunta</Title>
              <Time>{orderDetail.dateFormatted}</Time>
            </Header>

            <Description>{orderDetail.question}</Description>
          </Box>

          {orderDetail.answer && (
            <Box>
              <Header>
                <Title>Resposta</Title>
                <Time>{orderDetail.answerAtFormatted}</Time>
              </Header>

              <Description>{orderDetail.answer}</Description>
            </Box>
          )}
        </Content>
      </Container>
    </>
  );
}

HelpOrderDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
