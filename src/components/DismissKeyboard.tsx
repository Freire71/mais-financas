import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const DismissKeyboard = ({children}: {children: any}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
