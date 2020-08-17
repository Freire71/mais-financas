import React, {useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {NavigationTabScreenProps} from 'react-navigation-tabs';

import PageHeader from '../components/PageHeader';
import TransactionList from '../components/TransactionList';
import TransactionListInput from '../components/TransactionListInput';
import {
  ITransactionCategoryEnum,
  ITransactionTypeEnum,
} from '../models/Transaction';
import {useTransactions} from '../providers/TransactionsProvider';

const Container = styled.View`
  padding-top: 12px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

interface IProps extends NavigationTabScreenProps {}

const ListTransactions = (props: IProps) => {
  const typeAll = 'Todos';
  const categoryAll = 'Todas';
  const [listTitle, setListTitle] = useState('Todas transações');
  const [type, setType] = useState<string>(typeAll);
  const [category, setCategory] = useState<string | null>(null);
  const {transactions, filterTransactions} = useTransactions();

  const onTypePress = (type: string) => {
    switch (type) {
      case typeAll:
        setListTitle('Todas transações');
        break;
      case ITransactionTypeEnum.INCOME:
        setListTitle('Todas transações de entrada');
        break;
      case ITransactionTypeEnum.OUTCOME:
        setListTitle('Todas transações de saída');
        break;
    }
    setCategory(null);
    setType(type);
    filterTransactions(type, null);
  };

  const onCategoryPress = (category: string) => {
    switch (category) {
      case categoryAll:
        setListTitle('Todas transações de saída');
        break;
      default:
        setListTitle(`Todas transações de saída - ${category}`);
        break;
    }
    setCategory(category);
    filterTransactions(type, category);
  };

  return (
    <>
      <PageHeader label="Transações" />
      <Container>
        <TransactionListInput
          initialValue={type}
          value={type}
          onPress={onTypePress}
          label="Tipo"
          data={[
            typeAll,
            ITransactionTypeEnum.INCOME,
            ITransactionTypeEnum.OUTCOME,
          ]}
        />
        <TransactionListInput
          value={category}
          onPress={onCategoryPress}
          isDisabled={type === ITransactionTypeEnum.INCOME || type === typeAll}
          label="Categoria"
          data={[
            categoryAll,
            ITransactionCategoryEnum.GENERAL,
            ITransactionCategoryEnum.FUN,
            ITransactionCategoryEnum.EDUCATION,
            ITransactionCategoryEnum.HEALTHCARE,
            ITransactionCategoryEnum.HABITATION,
            ITransactionCategoryEnum.FOOD,
          ]}
        />
        <TransactionList title={listTitle} data={transactions} />
      </Container>
    </>
  );
};

export default ListTransactions;
