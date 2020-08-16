import React from 'react';
import {Platform, KeyboardTypeOptions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';
import InputLabel from './InputLabel';

const textInputStyle = {
  height: Platform.OS === 'ios' ? hp(6) : hp(12),
  fontSize: 18,
  color: '#424957',
};

const BaseCardShadow = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
`;

const Container = styled(BaseCardShadow)`
  background-color: #fff;
  align-self: center;
  border-radius: 10px;
  width: 90%;
  padding-left: 4%;
  margin-bottom: ${hp(2)}px;
`;

interface IProps {
  keyboardType: KeyboardTypeOptions;
  handleValue: (value: string) => void;
  placeholder?: string;
  mask?: string;
  label: string;
  tip?: string;
  required?: boolean;
  value: any;
}

export const AHints = {
  inputMask: 'Esse é o componente de entrada de dados',
};

export const TestIDs = {
  inputMaskContainer: 'inpust-mask-container',
};

const Input = (props: IProps) => {
  return (
    <>
      <InputLabel
        label={props.label}
        required={props.required}
        tip={props.tip}
      />

      <Container testID={TestIDs.inputMaskContainer}>
        <TextInputMask
          accessibilityHint={AHints.inputMask}
          placeholder={props.placeholder || ''}
          onChangeText={props.handleValue}
          keyboardType={props.keyboardType}
          placeholderTextColor="#727C8F"
          style={textInputStyle}
          mask={props.mask || ''}
          editable
          value={props.value}
          defaultValue={props.value}
          numberOfLines={5}
          autoCapitalize={'sentences'}
        />
      </Container>
    </>
  );
};

export default Input;
