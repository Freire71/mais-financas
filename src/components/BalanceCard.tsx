import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BaseCardShadow = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
`;

const Container = styled(BaseCardShadow)`
  background-color: #fff;
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
  color: ${(props) => props.theme.primaryTextColor};
  margin-bottom: 5px;
`;

const BalanceLabel = styled.Text`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: ${(props) => props.theme.primaryTextColor};
  font-size: 25px;
`;

const DataCardContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const DataCardTitle = styled(Title)`
  font-size: 14px;
`;

const DataCardBalanceLabel = styled(BalanceLabel)`
  font-size: 18px;
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

const BalanceCard = (props: IProps) => {
  return (
    <Container>
      <Title>Saldo Atual</Title>
      <BalanceLabel>R$ {props.balance.toFixed(2).toString()}</BalanceLabel>
      <DataCardContainer>
        <DataCard>
          <Icon name="caret-up-outline" size={25} color="#00BFA6" />
          <DataCardTitle>Entrada</DataCardTitle>
          <DataCardBalanceLabel>
            R$ {props.todayIncome.toFixed(2).toString()}
          </DataCardBalanceLabel>
        </DataCard>
        <DataCard>
          <Icon name="caret-down-outline" size={25} color="#F50057" />
          <DataCardTitle>Saída</DataCardTitle>
          <DataCardBalanceLabel>
            R$ {props.todayOutcome.toFixed(2).toString()}
          </DataCardBalanceLabel>
        </DataCard>
      </DataCardContainer>
    </Container>
  );
};

export default BalanceCard;
