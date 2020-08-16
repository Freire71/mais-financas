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
  margin-left: 2%;
  margin-right: 2%;
`;

const Title = styled.Text<{type: ITransactionTypeEnum}>`
  font-family: ${(props) => props.theme.fontFamilyBold};
  font-size: 16px;
  max-width: 95%;
  color: ${(props) => props.theme.primaryTextColor};
`;

const Category = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Amount = styled.Text<{type: ITransactionTypeEnum}>`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: ${(props) =>
    props.type === ITransactionTypeEnum.INCOME
      ? props.theme.secondaryIncomeColor
      : props.theme.secondaryOutcomeColor};
`;

export enum ITransactionTypeEnum {
  INCOME = 'Entrada',
  OUTCOME = 'Saída',
}

export enum ITransactionCategoryEnum {
  FOOD = 'Alimentação',
  HABITATITON = 'Habitação',
  HEALTHCARE = 'Saúde',
  EDUCATION = 'Educação',
  FUN = 'Lazer',
  GENERAL = 'Geral',
}

export interface ITrasanctionItemProps {
  id: string;
  amount: number;
  type: ITransactionTypeEnum;
  category?: ITransactionCategoryEnum;
  title: string;
  description?: string;
}

const TransactionItem = (props: ITrasanctionItemProps) => {
  return (
    <Container>
      <DataContainer>
        <Title numberOfLines={3} ellipsizeMode="tail" type={props.type}>
          {props.title}
        </Title>
        {props.category && <Category>{props.category}</Category>}
        <Amount type={props.type}>{DisplayMonetaryValue(props.amount)}</Amount>
      </DataContainer>
      <Icon
        name={
          props.type === ITransactionTypeEnum.INCOME
            ? 'caret-up-outline'
            : 'caret-down-outline'
        }
        size={25}
        color={
          props.type === ITransactionTypeEnum.INCOME ? '#00BFA6' : '#F50057'
        }
      />
    </Container>
  );
};

export default TransactionItem;
