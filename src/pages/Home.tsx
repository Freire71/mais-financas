import React from 'react';
import styled from 'styled-components/native';

import PageHeader from '../components/PageHeader';
import BalanceCard from '../components/BalanceCard';
import {
  ITransactionCategoryEnum,
  ITransactionTypeEnum,
  ITrasanctionItemProps,
} from '../components/TransactionItem';
import TransactionList from '../components/TransactionList';

const Container = styled.View`
  padding-top: 10px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

const Home = (props: any) => {
  const data = [
    {
      id: '1',
      amount: 100.0,
      title: 'Compra de Comida',
      category: ITransactionCategoryEnum.FOOD,
      type: ITransactionTypeEnum.OUTCOME,
    },
    {
      id: '1',
      amount: 100.0,
      title: 'Recebimento de dividendos',
      type: ITransactionTypeEnum.INCOME,
    },
    {
      id: '3',
      amount: 1500.0,
      title:
        'Recebimento de bonificação bonificação bonificação bonificação bonificação',
      type: ITransactionTypeEnum.INCOME,
    },
    {
      id: '4',
      amount: 1000.0,
      title: 'Aluguel',
      category: ITransactionCategoryEnum.HABITATITON,
      type: ITransactionTypeEnum.OUTCOME,
    },
  ] as ITrasanctionItemProps[];
  return (
    <>
      <PageHeader label="Home" />
      <Container>
        <BalanceCard
          todayIncome={1000.0}
          todayOutcome={525.3}
          balance={3000.255}
        />
        <TransactionList title="Últimas transações" data={data} />
      </Container>
    </>
  );
};

export default Home;
