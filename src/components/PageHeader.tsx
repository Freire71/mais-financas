import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Container = styled.View`
  width: 100%;
  height: ${hp(4.8)}px;
  shadow-color: #000;
  shadow-offset: 0px ${hp(0.324)}px;
  shadow-opacity: 0.16;
  border-bottom-width: 1px;
  border-bottom-color: #e4e4e4;
  background-color: #fff;
  z-index: 1;
`;

export const Content = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.primaryColor};
  flex: 1;
  padding-bottom: ${wp(0.4)}px;
  margin-left: 10px;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamilyBold};
`;

interface IProps {
  label: string;
  centerText?: boolean;
  rightAction?: {
    iconName: string;
    onPress: () => void;
    AHint?: string;
    ALabel?: string;
  };
}

export const AHints = {
  headerLabel: 'Aqui é exibido o nome da página atual',
};

export const TestIDs = {
  iconContainer: 'icon-container',
  headerLabel: 'header-label',
};

const PageHeader = (props: IProps) => {
  return (
    <SafeAreaView>
      <Container>
        <Content>
          <Label
            accessibilityHint={AHints.headerLabel}
            numberOfLines={2}
            ellipsizeMode="tail">
            {props.label}
          </Label>
          {props.rightAction && (
            <TouchableOpacity
              testID={TestIDs.iconContainer}
              accessibilityHint={props.rightAction.AHint}
              accessibilityLabel={props.rightAction.ALabel}
              onPress={props.rightAction.onPress}
              style={{right: 0, position: 'absolute', marginRight: 5}}>
              <Icon
                name={props.rightAction.iconName}
                size={25}
                color="#6C63FF"
              />
            </TouchableOpacity>
          )}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default PageHeader;
