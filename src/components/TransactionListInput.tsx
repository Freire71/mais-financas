import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import InputLabel from './InputLabel';

const Label = styled.Text<{disabled?: boolean; color: string}>`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: ${(props) => props.color};
  font-size: 20px;
  margin-bottom: 1px;
`;

const Separator = styled.View`
  width: ${wp(2)}px;
`;

const BaseCardShadow = styled.View`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
  elevation: 3;
`;

const Container = styled(BaseCardShadow)<{isDisabled?: boolean}>`
  background-color: ${(props) =>
    props.isDisabled ? 'rgb(245,245,245)' : '#fff'};
  align-self: center;
  border-radius: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 90%;
  margin-bottom: ${hp(2)}px;
`;

interface IProps {
  tip?: string;
  label: string;
  data: string[];
  isDisabled?: boolean;
  required?: boolean;
  onPress: (item: any) => void;
  value: any;
  initialValue?: string;
}

interface IOption {
  title: string;
  selected: boolean;
}

export const ALabels = {
  item: 'Opção de escolha',
};

const TransactionTypeSwitch = (props: IProps) => {
  React.useEffect(() => {
    let selectedItem = null;
    setOptions(
      props.data.map((d) => {
        let selected = false;
        if (props.initialValue && props.initialValue === d) {
          selected = props.initialValue === d;
          selectedItem = {title: d, selected};
        }
        const register = {title: d, selected};
        return register;
      }),
    );
    setSelectedItem(selectedItem);
  }, []);

  React.useEffect(() => {
    if (!props.value) {
      setOptions(props.data.map((d) => ({title: d, selected: false})));
      setSelectedItem(null);
    }
  }, [props.value]);

  const [options, setOptions] = React.useState<IOption[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<IOption | null>(null);

  const onPress = (index: number) => {
    const newOptions = options.map((o) => ({title: o.title, selected: false}));
    newOptions[index].selected = true;
    setOptions(newOptions);
    setSelectedItem(newOptions[index]);
    props.onPress(newOptions[index].title);
  };

  const renderItem = ({item, index}: {item: IOption; index: number}) => {
    let color;
    if (props.isDisabled) {
      color = '#727C8F';
    } else if (!selectedItem) {
      color = '#424957';
    } else if (item.title !== selectedItem.title) {
      color = '#727C8F';
    } else {
      color = '#6C63FF';
    }
    return (
      <TouchableOpacity
        accessibilityLabel={ALabels.item}
        onPress={() => !props.isDisabled && onPress(index)}>
        <Label color={color}>{item.title}</Label>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: any, index: number) => `${index}`;

  return (
    <>
      <InputLabel
        label={props.label}
        tip={props.tip}
        required={props.required}
      />
      <Container isDisabled={props.isDisabled}>
        <FlatList
          contentContainerStyle={{
            marginLeft: '2%',
          }}
          horizontal
          data={options}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Separator />}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
        />
      </Container>
    </>
  );
};

export default TransactionTypeSwitch;
