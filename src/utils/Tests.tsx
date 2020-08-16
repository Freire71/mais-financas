import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import theme from '../config/Theme';

export function renderWithProvider({children}: {children: React.ReactNode}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const customRender = (ui: any) => render(ui, {wrapper: renderWithProvider});

export * from '@testing-library/react-native';
export {customRender as render};
