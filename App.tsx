import React from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['componentWillReceiveProps', 'Require cycle']); // warning threw by external libraries

import NavigationContainer from './src/config/Navigator';
import theme from './src/config/Theme';
import {TransactionsProvider} from './src/providers/TransactionsProvider';
import {BalanceProvider} from './src/providers/BalanceProvider';
import {AuthProvider} from './src/providers/AuthProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BalanceProvider>
          <TransactionsProvider>
            <NavigationContainer />
          </TransactionsProvider>
        </BalanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
