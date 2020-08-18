import 'jest-styled-components';
import '@testing-library/jest-native/extend-expect';

import {NativeModules} from 'react-native';
import jest from 'jest-mock';

NativeModules.StatusBarManager.getHeight = jest.fn();

NativeModules.NativeEnvironment = {
  getEnvironment: jest.fn(() => 'sandbox'),
};
