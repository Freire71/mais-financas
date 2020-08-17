import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['componentWillReceiveProps', 'Require cycle']); // warning threw by external libraries

import NavigationContainer from './src/config/Navigator';
import theme from './src/config/Theme';
import {TransactionsProvider} from './src/providers/TransactionsProvider';
import {BalanceProvider} from './src/providers/BalanceProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BalanceProvider>
        <TransactionsProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
          </NavigationContainer>
        </TransactionsProvider>
      </BalanceProvider>
    </ThemeProvider>
  );
};

export default App;
