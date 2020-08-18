import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {
  createStackNavigator,
  NavigationStackConfig,
} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import TourPage from '../pages/Tour';
import HomePage from '../pages/Home';
import ListTransactionsPage from '../pages/ListTransactions';
import CreateTransactionpage from '../pages/CreateTransaction';
import LoginPage from '../pages/Login';
import CreateAccountPage from '../pages/CreateAccount';
import RouterPage from '../pages/Router';

const stackNavigatorDefaultConfig: NavigationStackConfig = {
  headerMode: 'none',
};

const AuthNavigator = createStackNavigator(
  {
    Tour: TourPage,
    Login: LoginPage,
    CreateAccount: CreateAccountPage,
  },
  {
    ...stackNavigatorDefaultConfig,
    initialRouteName: 'Tour',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomePage,
    CreateTransaction: CreateTransactionpage,

    ListTransactions: ListTransactionsPage,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'CreateTransaction':
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            break;
          case 'ListTransactions':
            iconName = focused ? 'wallet' : 'wallet-outline';
            break;
          default:
            iconName = 'planet';
        }
        return (
          <Icon
            name={iconName}
            size={routeName === 'CreateTransaction' ? 35 : 25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#6C63FF',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthNavigator: {
        screen: AuthNavigator,
      },
      MainNavigator: {
        screen: TabNavigator,
      },
      RouterPage,
    },
    {
      initialRouteName: 'RouterPage',
    },
  ),
);
