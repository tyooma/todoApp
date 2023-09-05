import styled from 'styled-components/native';
import { mainColors } from '../../../constants/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding-vertical: 20px;
  padding-horizontal: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Placeholder = styled.Text`
  position: absolute;
  top: 80px;
  left: 30px;
  font-size: 20px;
  color: ${mainColors.undone};
`;

export const Input = styled.TextInput`
  padding-left: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  border-width: 1px;
  border-color: ${mainColors.undone};
  border-radius: 10px;
  text-align-vertical: top;
`;

export const AddButton = styled.TouchableOpacity`
  padding: 15px;
  align-items: center;
  background-color: ${mainColors.pinky};
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const AddButtonText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${mainColors.teeth};
`;
