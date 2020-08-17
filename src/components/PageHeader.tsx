import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';

export const Label = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
  font-family: ${(props) => props.theme.fontFamilyBold};
`;

interface IAction {
  iconName: string;
  onPress: () => void;
  AHint?: string;
  ALabel?: string;
}

interface IProps {
  label: string;
  centerText?: boolean;
  rightAction?: IAction;
  leftAction?: IAction;
}

export const AHints = {
  headerLabel: 'Aqui é exibido o nome da página atual',
};

export const TestIDs = {
  iconContainer: 'icon-container',
  headerLabel: 'header-label',
};

const Action = (props: IAction) => (
  <TouchableOpacity
    testID={TestIDs.iconContainer}
    accessibilityHint={props.AHint}
    accessibilityLabel={props.ALabel}
    onPress={props.onPress}>
    <Icon name={props.iconName} size={27.5} color="#6C63FF" />
  </TouchableOpacity>
);

const PageHeader = (props: IProps) => {
  return (
    <View
      style={{
        paddingBottom: 10,
        backgroundColor: 'rgb(250,250,250)',
      }}>
      <Header
        statusBarProps={{barStyle: 'dark-content'}}
        barStyle="light-content"
        rightComponent={props.rightAction && <Action {...props.rightAction} />}
        leftComponent={props.leftAction && <Action {...props.leftAction} />}
        centerComponent={<Label>{props.label}</Label>}
        containerStyle={{
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      />
    </View>
  );
};

export default PageHeader;
