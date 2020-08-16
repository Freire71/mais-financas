import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import styled from 'styled-components/native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import TransactionTypeSection from '../components/TransactionListInput';
import DismissKeyboard from '../components/DismissKeyboard';

const Container = styled.ScrollView`
  padding-top: 10px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

const ButtonContainer = styled.View`
  align-self: center;
`;

interface IProps {}

const CreateTransaction = (props: IProps) => {
  const [title, setTitle] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [stringAmount, setStringAmout] = React.useState<string>('0');
  const [amount, setAmount] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>('');

  const onClearPress = () => {
    setTitle('');
    setType('');
    setCategory('');
    setStringAmout('0');
    setDescription('');
  };

  return (
    <KeyboardAwareScrollView>
      <PageHeader
        label="Nova transação"
        rightAction={{
          iconName: 'trash-outline',
          onPress: onClearPress,
        }}
      />
      <Container>
        <Input
          placeholder="Digite aqui o título transação"
          label="Título"
          required
          handleValue={setTitle}
          value={title}
          keyboardType="default"
          tip="Esse campo é destinado para o título da sua transação. Esse é o principal identificador da mesma"
        />
        <TransactionTypeSection
          value={type}
          onPress={setType}
          required
          label="Tipo"
          maxSelectCount={1}
          data={['Entrada', 'Saída']}
          tip="As transações podem ser de dois tipos: entrada e saída."
        />
        <TransactionTypeSection
          value={category}
          onPress={setCategory}
          isDisabled={type === 'Entrada' || type === ''}
          label="Categoria"
          maxSelectCount={1}
          data={[
            'Geral',
            'Lazer',
            'Educação',
            'Saúde',
            'Habitação',
            'Alimentação',
          ]}
          tip="A categoria da transação ajuda no controle dos seus gastos. Essa classificação aplica-se apenas a transações do tipo 'saída'"
        />
        <Input
          placeholder="Digite aqui o valor da transação"
          value={stringAmount}
          label="Valor *"
          handleValue={(value) => {
            setAmount(parseFloat(value.replace('R$', '')));
            setStringAmout(value);
          }}
          keyboardType="numeric"
          mask={'R$ [99999999].[99]'}
          tip="Insira aqui o valor da sua transação. Não é necessário colocar valores negativos para transações de saída. Valor máximo: R$ 99999999.99"
        />
        <Input
          placeholder="Digite aqui a descrição da transação"
          value={description}
          label="Descrição"
          handleValue={setDescription}
          keyboardType="default"
          tip="Utilize o campo de descrição para adicionar informações adicionais sobre a transação"
        />
        <ButtonContainer>
          <Button
            raised
            title="Cadastrar"
            buttonStyle={{
              backgroundColor: '#6C63FF',
              width: wp(60),
            }}
            containerStyle={{marginTop: hp(2)}}
          />
        </ButtonContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default CreateTransaction;
