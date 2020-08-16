import React from 'react';
import styled from 'styled-components/native';

import PageHeader from '../components/PageHeader';
import BalanceCard from '../components/BalanceCard';

import TransactionList from '../components/TransactionList';

import {useTransactions} from '../providers/TransactionsProvider';

const Container = styled.View`
  padding-top: 10px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

const Home = (props: any) => {
  const {transactions} = useTransactions();

  return (
    <>
      <PageHeader label="+Finanças" />
      <Container>
        <BalanceCard
          todayIncome={1000.0}
          todayOutcome={525.3}
          balance={3000.255}
        />
        <TransactionList title="Últimas transações" data={transactions} />
      </Container>
    </>
  );
};

export default Home;
