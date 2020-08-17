import React from 'react';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import TransactionItem from './TransactionItem';
import Transaction from '../models/Transaction';

const SectionText = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.primaryTextColor};
  font-family: ${(props) => props.theme.fontFamily};
  margin-left: ${wp(5)}px;
  margin-bottom: 3%;
`;

const EmptyListText = styled.Text`
  font-size: 22px;
  color: ${(props) => props.theme.secondaryTextColor};
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

const EmptyListContainer = styled.View`
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 200px;
  width: 250px;
`;

export interface ITransactionListProps {
  title: string;
  data: Transaction[];
}

export const AHints = {
  title: 'Título da lista de transações',
  emptyListText: 'Esse texto indica que a lista está vazia',
  list: 'Essa é a lista de transações',
};

export const ALAbels = {
  listItem: 'uma transação',
};

const TransactionList = (props: ITransactionListProps) => {
  const renderItem = ({item}: {item: Transaction}) => {
    return <TransactionItem {...item} />;
  };

  const keyExtractor = (item: Transaction, index: number) =>
    `${item.id}/${index}`;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <SectionText accessibilityHint={AHints.title}>
          {props.title}
        </SectionText>
      )}
      ListEmptyComponent={() => (
        <EmptyListContainer>
          <EmptyListText
            numberOfLines={2}
            accessibilityHint={AHints.emptyListText}>
            Ainda não há transações registradas
          </EmptyListText>
        </EmptyListContainer>
      )}
      contentContainerStyle={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        width: '90%',
        marginLeft: '5%',
        paddingTop: '2%',
        borderRadius: 10,
        paddingBottom: '3%',
      }}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default TransactionList;
