import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components';

import NavigationContainer from './src/config/Navigator';
import theme from './src/config/Theme';
import {TransactionsProvider} from './src/providers/TransactionsProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TransactionsProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
        </NavigationContainer>
      </TransactionsProvider>
    </ThemeProvider>
  );
};

export default App;
