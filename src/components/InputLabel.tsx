import React from 'react';
import {Tooltip} from 'react-native-elements';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Label = styled.Text`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: ${(props) => props.theme.primaryColor};
  font-size: 20px;
  margin-bottom: 1px;
`;

const TipText = styled.Text`
  font-family: ${(props) => props.theme.fontFamilyBold};
  color: #fff;
  font-size: 18px;
`;

const Container = styled.View`
  margin-left: 6%;
  flex-direction: row;
`;

interface IProps {
  tip?: string;
  label: string;
  required?: boolean;
}

export const AHints = {
  label: 'Aqui está indicado o nome do campo que será preenchido',
  tipIcon: 'Mostra o ícone de ajuda',
  tipText: 'Aqui está a explicação do campo que será preenchido',
};

export const TestIDs = {
  label: 'input-label-text',
  tipIcon: 'tip-icon',
  tipText: 'tip-text',
};

const InputLabel = (props: IProps) => {
  return (
    <Container>
      <Label accessibilityHint={AHints.label} testID={TestIDs.label}>
        {props.required ? `${props.label} *` : `${props.label}`}
      </Label>
      {props.tip && (
        <Tooltip
          backgroundColor="#6C63FF"
          withPointer={false}
          height={250}
          containerStyle={{left: wp(25), width: 225}}
          popover={
            <TipText
              testID={TestIDs.tipText}
              accessibilityHint={AHints.tipText}>
              {props.tip}
            </TipText>
          }>
          <Icon
            accessibilityHint={AHints.tipIcon}
            name="help-circle"
            size={25}
            color="#6C63FF"
            style={{marginLeft: '2%'}}
          />
        </Tooltip>
      )}
    </Container>
  );
};

export default InputLabel;
