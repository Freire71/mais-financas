import React from 'react';
import styled from 'styled-components/native';
import {NavigationTabScreenProps} from 'react-navigation-tabs';

import PageHeader from '../components/PageHeader';
import BalanceCard from '../components/BalanceCard';

import TransactionList from '../components/TransactionList';

import {useTransactions} from '../providers/TransactionsProvider';
import {useBalance} from '../providers/BalanceProvider';
import {useAuth} from '../providers/AuthProvider';

const Container = styled.View`
  padding-top: 12px;
  background-color: rgb(250, 250, 250);
  flex: 1;
`;

interface IProps extends NavigationTabScreenProps {}

const Home = (props: IProps) => {
  const {
    lastTransactions,
    todayIncomeTransactionAmount,
    todayOutcomeTransactionAmount,
  } = useTransactions();
  const {currentBalance} = useBalance();
  const {logout} = useAuth();

  return (
    <>
      <PageHeader
        label="+Finanças"
        rightAction={{
          iconName: 'exit-outline',
          onPress: async () => {
            await logout();
            props.navigation.navigate('AuthNavigator');
          },
          AHint: 'Ao apertar no ícone você será desconectado',
          ALabel: 'Sair',
        }}
      />
      <Container>
        <BalanceCard
          todayIncome={todayIncomeTransactionAmount}
          todayOutcome={todayOutcomeTransactionAmount}
          balance={currentBalance}
        />
        <TransactionList title="Últimas transações" data={lastTransactions} />
      </Container>
    </>
  );
};

export default Home;
