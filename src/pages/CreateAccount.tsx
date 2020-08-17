import React, {useState} from 'react';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {withNavigation} from 'react-navigation';
import Validator from 'validator';
import Alert from 'react-native-awesome-alerts';
import {NavigationStackScreenProps} from 'react-navigation-stack';

import {useAuth} from '../providers/AuthProvider';
import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import {Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';

const ButtonContainer = styled.View`
  width: 60%;
  align-self: center;
`;

interface IProps extends NavigationStackScreenProps {}

const CreateAcount = (props: IProps) => {
  const {checkIfEmailAlreadyExists, createNewAccount} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const [stringInitialValue, setStringInitialValue] = useState('0');

  const validateData = () => {
    const errors = [];
    if (!Validator.isEmail(email)) {
      errors.push('Informe um e-mail válido');
    }
    if (name === '') {
      errors.push('Informe um nome');
    }
    return errors;
  };

  const onSignUpPress = async () => {
    const errors = validateData();
    if (errors.length > 0) {
      const errorsString = errors.join('\n');
      const text = 'Atenção ao preenchimento do formulário.\n\n'.concat(
        errorsString,
      );
      setAlertText(text);
      return setShowAlert(true);
    }
    const exists = await checkIfEmailAlreadyExists(email);
    if (exists) {
      return Snackbar.show({
        text: 'O e-mail informado já está cadastrado na base de dados',
        fontFamily: 'Nunito-Regular',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#6C63FF',
      });
    }
    await createNewAccount({email, name}, initialValue);
    props.navigation.navigate('Home');
  };
  return (
    <>
      <PageHeader
        label="Nova conta"
        leftAction={{
          iconName: 'arrow-back-outline',
          onPress: () => props.navigation.goBack(),
        }}
      />
      <Alert
        show={showAlert}
        showProgress={false}
        title="Opa!"
        message={alertText}
        titleStyle={{fontFamily: 'Nunito-Bold', color: '#424957'}}
        messageStyle={{fontFamily: 'Nunito-Bold', color: '#424957'}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#6C63FF"
        onConfirmPressed={() => setShowAlert(false)}
      />

      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{
          backgroundColor: 'rgb(250,250,250)',
          flex: 1,
          paddingTop: 12,
        }}>
        <Input
          required
          capitalize
          keyboardType="default"
          handleValue={setName}
          label="Nome"
          value={name}
          placeholder="Digite aqui seu nome"
        />
        <Input
          required
          keyboardType="email-address"
          handleValue={setEmail}
          label="E-mail"
          value={email}
          placeholder="Digite aqui seu e-mail"
          tip="Você usará seu e-mail como forma de login. Lembre-se de utilizar um e-mail válido"
        />

        <Input
          value={stringInitialValue}
          label="Quantia inicial"
          handleValue={(value) => {
            setInitialValue(parseFloat(value.replace('R$', '')));
            setStringInitialValue(value);
          }}
          keyboardType="numeric"
          mask={'R$ [99999999].[99]'}
          tip="Digite a quantia que você possui atualmente disponível. Valor máximo: R$ 99999999.99"
        />
        <ButtonContainer>
          <Button
            raised
            onPress={onSignUpPress}
            title="Cadastrar"
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

export default withNavigation(CreateAcount);
