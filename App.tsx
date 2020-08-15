import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components';

import NavigationContainer from './src/config/Navigator';
import theme from './src/config/Theme';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
