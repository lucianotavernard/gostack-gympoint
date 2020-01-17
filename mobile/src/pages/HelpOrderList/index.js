import React, { useState, useEffect, useCallback } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import api from '~/services/api';

import HelpOrder from '~/components/HelpOrder';

import { Container, Loading, List, Button } from './styles';

function HelpOrderList({ isFocused, navigation }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const userId = useSelector(state => state.auth.user?.id);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(
      `students/${userId}/help-orders?page=${pageNumber}`
    );
    const totalItems = response.data.total;

    const data = response.data.helpOrders.map(order => ({
      ...order,
      dateFormatted: format(
        parseISO(order.created_at),
        "dd 'de' LLLL, 'às' HH'h'",
        {
          locale: ptBR,
        }
      ),
      answerAtFormatted: order.answer_at
        ? format(parseISO(order.answer_at), "dd 'de' LLLL, 'às' HH'h'", {
            locale: ptBR,
          })
        : null,
    }));

    setTotal(totalItems <= 10 ? 1 : Math.floor(totalItems / 10));
    setOrders(shouldRefresh ? data : [...orders, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage();

    setRefreshing(false);
  }

  const loadPageCallback = useCallback(loadPage, []);

  useEffect(() => {
    loadPageCallback();
  }, [loadPageCallback, isFocused]);

  return (
    <Container>
      <List
        data={orders}
        keyExtractor={item => String(item.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.3}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListHeaderComponent={
          <Button
            label="Novo pedido de auxílio"
            onPress={() => navigation.navigate('HelpOrderNew')}
          />
        }
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <HelpOrder
            onPress={() =>
              navigation.navigate('HelpOrderDetail', { orderDetail: item })
            }
            data={item}
          />
        )}
      />
    </Container>
  );
}

HelpOrderList.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default withNavigationFocus(HelpOrderList);
