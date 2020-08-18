import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import DisplayMonetaryValue from '../utils/DisplayMonetaryValue';
import Transaction, {ITransactionTypeEnum} from '../models/Transaction';

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
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2%;
`;

const DataContainer = styled.View`
  flex: 7;
  margin-left: 2%;
  margin-right: 2%;
`;

const Title = styled.Text<{type: ITransactionTypeEnum}>`
  font-family: ${(props) => props.theme.fontFamilyBold};
  font-size: 18px;
  color: ${(props) => props.theme.primaryTextColor};
`;

const Category = styled.Text`
  font-size: 16px;

  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Amount = styled.Text<{type: ITransactionTypeEnum}>`
  font-family: ${(props) => props.theme.fontFamilyBold};
  font-size: 16px;

  color: ${(props) =>
    props.type === ITransactionTypeEnum.INCOME
      ? props.theme.secondaryIncomeColor
      : props.theme.secondaryOutcomeColor};
`;

const Date = styled.Text`
  margin-top: 4px;
  font-size: 12px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

export const AHints = {
  title: 'Aqui é exibido o titulo da transação',
  amount: 'Aqui é exibido o valor da transação',
  category: 'Aqui é exibido a categoria da transação',
  type: 'Ícone que indica o tipo da transação',
};

export const ALabels = {
  incomeTransaction: 'Transação de entrada',
  outcomeTransaction: 'Transação de saída',
};

const TransactionItem = (props: Transaction) => {
  return (
    <Container>
      <DataContainer>
        <Title
          accessibilityHint={AHints.title}
          numberOfLines={3}
          ellipsizeMode="tail"
          type={props.type}>
          {props.title}
        </Title>
        {props.category && (
          <Category accessibilityHint={AHints.category}>
            {props.category}
          </Category>
        )}
        <Amount accessibilityHint={AHints.amount} type={props.type}>
          {DisplayMonetaryValue(props.amount)}
        </Amount>
        <Date>{`Dia ${props.created_at.getDate()}/${
          props.created_at.getMonth() + 1
        } às ${props.created_at.getHours()}:${props.created_at.getMinutes()}h`}</Date>
      </DataContainer>
      <Icon
        style={{flex: 1}}
        accessibilityHint={AHints.type}
        name={
          props.type === ITransactionTypeEnum.INCOME
            ? 'caret-up-outline'
            : 'caret-down-outline'
        }
        size={25}
        accessibilityLabel={
          props.type === ITransactionTypeEnum.INCOME
            ? ALabels.incomeTransaction
            : ALabels.outcomeTransaction
        }
        color={
          props.type === ITransactionTypeEnum.INCOME ? '#00BFA6' : '#F50057'
        }
      />
    </Container>
  );
};

export default TransactionItem;
