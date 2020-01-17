import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '~/components/Logo';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import HelpOrderNew from '~/pages/HelpOrderNew';
import HelpOrderList from '~/pages/HelpOrderList';
import HelpOrderDetail from '~/pages/HelpOrderDetail';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        Main: createBottomTabNavigator(
          {
            Dashboard,
            Help: createStackNavigator(
              {
                HelpOrderList,
                HelpOrderNew,
                HelpOrderDetail,
              },
              {
                defaultNavigationOptions: {
                  headerStyle: {
                    height: 46,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    elevation: 0,
                    shadowOpacity: 0,
                  },

                  headerTitle: () => <Logo />,
                  headerBackImage: ({ tintColor }) => (
                    <Icon name="chevron-left" size={24} color={tintColor} />
                  ),
                  headerTitleAlign: 'center',
                  headerTransparent: false,
                },
                navigationOptions: {
                  tabBarLabel: 'Pedir ajuda',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="live-help" size={20} color={tintColor} />
                  ),
                },
              }
            ),
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              style: {
                paddingVertical: 5,
                borderTopColor: '#999',
                backgroundColor: '#FFF',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'Main' : 'Sign',
      }
    )
  );
