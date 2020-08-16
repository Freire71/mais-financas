import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import Alert from 'react-native-awesome-alerts';

import PageHeader from '../components/PageHeader';
import Input from '../components/Input';
import TransactionListInput from '../components/TransactionListInput';
import {useTransactions} from '../providers/TransactionsProvider';

import {
  ITransactionCategoryEnum,
  ITransactionTypeEnum,
  ITransactionCreateData,
} from '../models/Transaction';

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<ITransactionTypeEnum | null>(null);
  const [category, setCategory] = useState<ITransactionCategoryEnum | null>(
    null,
  );
  const [stringAmount, setStringAmout] = useState<string>('0');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const {createTransaction} = useTransactions();

  const clearData = () => {
    setTitle('');
    setType(null);
    setCategory(null);
    setStringAmout('0');
    setAmount(0);
    setDescription('');
  };

  const validateData = () => {
    const errors: string[] = [];
    if (title === '') {
      errors.push('O campo de título é obrigatório.');
    }
    if (!type) {
      errors.push('O campo de tipo é obrigatório.');
    }
    if (type === ITransactionTypeEnum.OUTCOME && !category) {
      errors.push(
        'O campo de categoria é obrigatório para transações do tipo saída.',
      );
    }
    if (amount === 0) {
      errors.push('O campo de valor é obrigatório.');
    }
    return errors;
  };

  const onRegisterPress = () => {
    const errors = validateData();
    if (errors.length > 0) {
      const errorsString = errors.join('\n');
      const text = 'Atenção ao preenchimento do formulário.\n\n'.concat(
        errorsString,
      );
      console.log('deu erro');
      setAlertText(text);
      return setShowAlert(true);
    }
    const transaction = {
      title,
      amount,
      type,
      category: type === ITransactionTypeEnum.OUTCOME && category,
      description,
    };
    createTransaction(transaction as ITransactionCreateData);
    clearData();
    return Snackbar.show({
      text: 'Transação cadastrada com sucesso!',
      fontFamily: 'Nunito-Regular',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#6C63FF',
    });
  };

  return (
    <KeyboardAwareScrollView>
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
      <PageHeader
        label="Nova transação"
        rightAction={{
          iconName: 'trash-outline',
          onPress: clearData,
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
        <TransactionListInput
          value={type}
          onPress={setType}
          required
          label="Tipo"
          maxSelectCount={1}
          data={[ITransactionTypeEnum.INCOME, ITransactionTypeEnum.OUTCOME]}
          tip="As transações podem ser de dois tipos: entrada e saída."
        />
        <TransactionListInput
          required={type === ITransactionTypeEnum.OUTCOME}
          value={category}
          onPress={setCategory}
          isDisabled={type === ITransactionTypeEnum.INCOME || !type}
          label="Categoria"
          maxSelectCount={1}
          data={[
            ITransactionCategoryEnum.GENERAL,
            ITransactionCategoryEnum.FUN,
            ITransactionCategoryEnum.EDUCATION,
            ITransactionCategoryEnum.HEALTHCARE,
            ITransactionCategoryEnum.HABITATION,
            ITransactionCategoryEnum.FOOD,
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
            onPress={onRegisterPress}
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
