import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import api from '~/services/api';

import { Container, Input, FormSubmit } from './styles';

export default function HelpOrderNew() {
  const inputRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post(`students/${userId}/help-orders`, { question });

      Alert.alert('Success!', 'Question sent successfully!');
    } catch (error) {
      Alert.alert(
        'Error :(',
        'Sorry, There was an error submitting the question'
      );
    } finally {
      setQuestion('');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Input
        multiline
        textAlignVertical="top"
        placeholder="Inclua seu pedido de auxílio"
        numberOfLines={15}
        ref={inputRef}
        onChangeText={setQuestion}
        value={question}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <FormSubmit
        loading={loading}
        onPress={handleSubmit}
        label="Enviar pedido"
      />
    </Container>
  );
}
