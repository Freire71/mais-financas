import React, {useState} from 'react';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import Validator from 'validator';
import ShowSnackBar from '../utils/showSnackBar';

import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import {Button} from 'react-native-elements';

import {useAuth} from '../providers/AuthProvider';

const ButtonContainer = styled.View`
  width: 60%;
  align-self: center;
`;

interface IProps extends NavigationStackScreenProps {}

const Login = (props: IProps) => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');

  const onLoginPress = async () => {
    if (!Validator.isEmail(email)) {
      return ShowSnackBar('Informe um e-mail válido', -1);
    }
    const success = await login(email);
    return success && props.navigation.navigate('MainNavigator');
  };
  return (
    <>
      <PageHeader
        label="Entrar"
        leftAction={{
          iconName: 'arrow-back-outline',
          onPress: () => props.navigation.goBack(),
        }}
      />

      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          backgroundColor: 'rgb(250,250,250)',
          flex: 1,
          paddingTop: 12,
        }}>
        <Input
          keyboardType="email-address"
          handleValue={setEmail}
          label="E-mail"
          value={email}
          placeholder="Digite aqui seu e-mail"
        />
        <ButtonContainer>
          <Button
            raised
            onPress={onLoginPress}
            title="Entrar"
            titleStyle={{
              color: '#fff',
              fontFamily: 'Nunito-Bold',
            }}
            buttonStyle={{
              backgroundColor: '#6C63FF',
            }}
          />
        </ButtonContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

export default withNavigation(Login);
