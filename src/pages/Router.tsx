import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import styled from 'styled-components/native';

import {withNavigation} from 'react-navigation';
import {useAuth} from '../providers/AuthProvider';

const Router = (props: any) => {
  const {isLoading, currentUserId} = useAuth();
  useEffect(() => {
    if (!isLoading) {
      setTimeout(
        () =>
          props.navigation.navigate(
            currentUserId ? 'MainNavigator' : 'AuthNavigator',
          ),
        1000,
      );
    }
  }, [isLoading]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6C63FF',
      }}>
      <Text
        style={{
          fontFamily: 'Nunito-Bold',
          color: '#fff',
          fontSize: 30,
          marginBottom: 16,
        }}>
        +Finanças
      </Text>
      <ActivityIndicator animating={true} color="#fff" size="large" />
    </View>
  );
};

export default withNavigation(Router);
