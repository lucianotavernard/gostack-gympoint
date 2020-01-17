import React, { useState, useEffect, useCallback } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import Header from '~/components/Header';

import { Container, Loading, List, Button, Info, Label, Time } from './styles';

function Dashboard({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingCheckIn, setLoadingCheckIn] = useState(false);

  const userId = useSelector(state => state.auth.user?.id);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(
      `students/${userId}/checkins?page=${pageNumber}`
    );
    const totalItems = response.data.total;

    const data = response.data.checkins.map(checkin => ({
      ...checkin,
      label: `Check-in #${checkin.id}`,
      dateFormatted: format(
        parseISO(checkin.created_at),
        "dd 'de' LLLL, 'às' HH'h'",
        {
          locale: ptBR,
        }
      ),
    }));

    setTotal(totalItems <= 10 ? 1 : Math.floor(totalItems / 10));
    setCheckins(shouldRefresh ? data : [...checkins, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const loadPageCallback = useCallback(loadPage, []);

  useEffect(() => {
    loadPageCallback();
  }, [loadPageCallback, isFocused]);

  async function handleCheckIn() {
    try {
      setLoadingCheckIn(true);

      await api.post(`students/${userId}/checkins`);

      Alert.alert('Success!', 'Successful check in!');
    } catch (error) {
      Alert.alert(
        'Error :(',
        'You has already reached the weekly checkpoint limit'
      );
    } finally {
      setLoadingCheckIn(false);
    }
  }

  return (
    <Container>
      <Header />

      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.3}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListHeaderComponent={
          <Button
            label="Novo check-in"
            onPress={handleCheckIn}
            loading={loadingCheckIn}
          />
        }
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Info>
            <Label>{item.label}</Label>
            <Time>{item.dateFormatted}</Time>
          </Info>
        )}
      />
    </Container>
  );
}

function BarIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

BarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: BarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
