import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

import {withNavigation} from 'react-navigation';
import {useAuth} from '../providers/AuthProvider';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.primaryColor};
`;

const AppTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: #fff;
  font-size: 30px;
  margin-bottom: 16px;
`;

const Router = (props: any) => {
  const {isLoading, realmUserObject} = useAuth();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(
        () =>
          props.navigation.navigate(
            realmUserObject ? 'MainNavigator' : 'AuthNavigator',
          ),
        1000,
      );
    }
  }, [isLoading, realmUserObject]);

  return (
    <Container>
      <AppTitle>+Finanças</AppTitle>
      <ActivityIndicator animating={true} color="#fff" size="large" />
    </Container>
  );
};

export default withNavigation(Router);
