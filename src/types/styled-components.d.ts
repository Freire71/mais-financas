import theme from '../config/theme';

type ThemedComponent = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemedComponent {}
}
