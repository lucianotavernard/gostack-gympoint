import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Content, StatusBar, Status, Time, Text } from './styles';

export default function HelpOrder({ data, onPress }) {
  const { question, answered, dateFormatted } = data;

  return (
    <Container onPress={onPress}>
      <Content>
        <StatusBar>
          <Icon
            name="check-circle"
            color={answered ? '#42CB59' : '#999'}
            size={19}
          />
          <Status answered={answered}>
            {answered ? 'Respondida' : 'Sem Resposta'}
          </Status>
        </StatusBar>

        <Time>{dateFormatted}</Time>
      </Content>

      <Text>{question}</Text>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    answered: PropTypes.bool,
    question: PropTypes.string,
    dateFormatted: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
