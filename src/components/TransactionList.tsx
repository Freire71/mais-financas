import React from 'react';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import TransactionItem, {ITrasanctionItemProps} from './TransactionItem';

const SectionText = styled.Text`
  font-size: 22;
  color: ${(props) => props.theme.primaryTextColor};
  font-family: ${(props) => props.theme.fontFamily};
  margin-left: ${wp(5)};
  margin-bottom: 3%;
`;

export interface ITransactionListProps {
  title: string;
  data: ITrasanctionItemProps[];
}

const TransactionList = (props: ITransactionListProps) => {
  const renderItem = ({item}: {item: ITrasanctionItemProps}) => {
    return <TransactionItem {...item} />;
  };

  const keyExtractor = (item: ITrasanctionItemProps, index: number) =>
    `${item.id}/${index}`;

  return (
    <FlatList
      ListHeaderComponent={() => <SectionText>{props.title}</SectionText>}
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