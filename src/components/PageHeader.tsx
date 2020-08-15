import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${hp(4.8)}px;
  shadow-color: #000;
  shadow-offset: 0px ${hp(0.324)}px;
  shadow-opacity: 0.16px;
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
  color: black;
  flex: 1;
  padding-bottom: ${wp(0.4)}px;
  margin-left: 10px;
  text-align: center;
`;

interface IProps {
  label: string;
  centerText?: boolean;
}

const PageHeader = (props: IProps) => {
  return (
    <SafeAreaView>
      <Container>
        <Content>
          <Label numberOfLines={2} ellipsizeMode="tail">
            {props.label}
          </Label>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default PageHeader;
