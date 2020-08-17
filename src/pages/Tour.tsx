import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import {NavigationStackScreenProps} from 'react-navigation-stack';

import {Button} from 'react-native-elements';
import NoteList from '../assets/images/note_list.svg';
import Secure from '../assets/images/secure.svg';
import SteppingUp from '../assets/images/stepping_up.svg';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  padding: 0 5%;
`;

export const Content = styled.View`
  flex: 8;
  justify-content: center;
`;

export const Footer = styled.View`
  flex: 3;
  width: 60%;
  justify-content: center;
`;

export const DotContainer = styled.View`
  height: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${hp(2.2)}px;
`;

export const Dot = styled.View<{isActive: boolean}>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin: 0px 5px;
  border: 1px solid #424957;

  background-color: ${(props) => (props.isActive ? '#6C63FF' : '#FFF')};
`;

const Title = styled.Text`
  text-align: center;
  font-size: 22px;
  margin-bottom: 5px;
  color: #424957;
  font-family: ${(props) => props.theme.fontFamilyBold};
`;

const SubTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #424957;
  font-family: ${(props) => props.theme.fontFamily};
`;

const Item = styled.View`
  width: ${wp(90)}px;
  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
  align-items: center;
  justify-content: center;
`;

interface IProps extends NavigationStackScreenProps {}

const Tour = (props: IProps) => {
  const [currentView, setCurrentView] = React.useState<number>(0);
  const tourData = [
    {
      title: 'Tenha controle de todos seus gastos',
      subtitle:
        'Vamos te ajudar a chegar em um outro patamar na sua vida financeira',
      imageName: 'steppingUp',
    },
    {
      title: 'Interface intuitiva',
      subtitle:
        'Nossa interface é pensada para você economizar sem se atrapalhar',
      imageName: 'noteList',
    },
    {
      title: 'Dados 100% seguros',
      subtitle:
        'Utilizamos criptografia de ponta para proteger suas informações',
      imageName: 'secure',
    },
  ];

  const getSVG = (name: string) => {
    switch (name) {
      case 'noteList':
        return <NoteList width={wp(80)} height={hp(40)} />;
      case 'steppingUp':
        return <SteppingUp width={wp(80)} height={hp(40)} />;
      case 'secure':
        return <Secure width={wp(80)} height={hp(40)} />;
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <Item>
        {getSVG(item.imageName)}
        <Title adjustsFontSizeToFit>{item.title}</Title>
        <SubTitle adjustsFontSizeToFit>{item.subtitle}</SubTitle>
      </Item>
    );
  };
  return (
    <Container>
      <Header />
      <Content>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          data={tourData}
          renderItem={renderItem}
          keyExtractor={(_, index: number) => `tour-item-${index}`}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        />
        <DotContainer>
          {tourData.map((_, index) => (
            <Dot key={index} isActive={index === currentView} />
          ))}
        </DotContainer>
      </Content>
      <Footer>
        <Button
          onPress={() => props.navigation.navigate('Login')}
          title="Entrar"
          titleStyle={{
            color: '#fff',
            fontFamily: 'Nunito-Bold',
          }}
          buttonStyle={{
            backgroundColor: '#6C63FF',
          }}
          containerStyle={{marginBottom: 10}}
        />
        <Button
          onPress={() => props.navigation.navigate('CreateAccount')}
          title="Criar Conta"
          titleStyle={{
            color: '#FFF',
            fontFamily: 'Nunito-Bold',
          }}
          buttonStyle={{
            backgroundColor: '#727C8F',
          }}
        />
      </Footer>
    </Container>
  );
};

export default withNavigation(Tour);
