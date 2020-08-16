import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import DisplayMonetaryValue from '../utils/DisplayMonetaryValue';

const BaseCardShadow = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
`;

const Container = styled(BaseCardShadow)`
  background-color: ${(props) => props.theme.primaryColor};
  align-self: center;
  border-radius: 10px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: ${(props) => props.theme.fontFamily};
  color: #fff;
  margin-bottom: 5px;
`;

const BalanceLabel = styled.Text`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: #fff;
  font-size: 25px;
`;

const DataCardContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const DataCardTitle = styled(Title)`
  color: ${(props) => props.theme.primaryTextColor};
  font-size: 14px;
`;

const DataCardBalanceLabel = styled(BalanceLabel)`
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

const DataCard = styled(BaseCardShadow)`
  background-color: #fff;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
`;

interface IProps {
  balance: number;
  todayIncome: number;
  todayOutcome: number;
}

export const AHints = {
  balanceCard: 'Card do saldo atual',
  todayIncomeCard: 'Card de entrada diária',
  todayOutcomeCard: 'Card de saída diária',
};

const BalanceCard = (props: IProps) => {
  return (
    <Container>
      <Title>Saldo Atual</Title>
      <BalanceLabel accessibilityHint={AHints.balanceCard}>
        {DisplayMonetaryValue(props.balance)}
      </BalanceLabel>
      <DataCardContainer>
        <DataCard>
          <Icon name="caret-up-outline" size={25} color="#00BFA6" />
          <DataCardTitle>Entrada</DataCardTitle>
          <DataCardBalanceLabel accessibilityHint={AHints.todayIncomeCard}>
            {DisplayMonetaryValue(props.todayIncome)}
          </DataCardBalanceLabel>
        </DataCard>
        <DataCard>
          <Icon name="caret-down-outline" size={25} color="#F50057" />
          <DataCardTitle>Saída</DataCardTitle>
          <DataCardBalanceLabel accessibilityHint={AHints.todayOutcomeCard}>
            {DisplayMonetaryValue(props.todayOutcome)}
          </DataCardBalanceLabel>
        </DataCard>
      </DataCardContainer>
    </Container>
  );
};

export default BalanceCard;
