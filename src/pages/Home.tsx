import React from 'react';
import styled from 'styled-components/native';

import PageHeader from '../components/PageHeader';
import BalanceCard from '../components/BalanceCard';

import TransactionList from '../components/TransactionList';

import {useTransactions} from '../providers/TransactionsProvider';
import {useBalance} from '../providers/BalanceProvider';

const Container = styled.View`
  padding-top: 10px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

const Home = () => {
  const {
    transactions,
    todayIncomeTransactionAmount,
    todayOutcomeTransactionAmount,
  } = useTransactions();
  const {currentBalance} = useBalance();
  return (
    <>
      <PageHeader label="+Finanças" />
      <Container>
        <BalanceCard
          todayIncome={todayIncomeTransactionAmount}
          todayOutcome={todayOutcomeTransactionAmount}
          balance={currentBalance}
        />
        <TransactionList title="Últimas transações" data={transactions} />
      </Container>
    </>
  );
};

export default Home;
