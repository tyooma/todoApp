import { styled } from 'styled-components/native';

import { mainColors } from '../../../../constants/colors';

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 20px;
  width: 100%;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  width: 70%;
`;

export const Title = styled.Text`
  margin-left: 15px;
  font-size: 18px;
  color: ${props =>
    props.theme.complete ? mainColors.checked : mainColors.allblack};
`;

export const Trash = styled.TouchableOpacity`
  width: 20%;
`;
