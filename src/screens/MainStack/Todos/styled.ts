import styled from 'styled-components/native';

import { mainColors } from '../../../constants/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-vertical: 40px;
  padding-horizontal: 20px;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  margin-bottom: 25px;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  background-color: ${props => props.backgroundColor};
  border-radius: 15px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: ${mainColors.teeth};
`;

export const Filters = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const Filter = styled.TouchableOpacity`
  margin-horizontal: 15px;
  padding: 10px;
  width: 100px;
  background-color: ${props =>
    props.active ? mainColors.allblack : mainColors.undone};
  border-radius: 10px;
`;

export const FilterText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${mainColors.teeth};
`;

export const NoTodos = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${mainColors.allblack};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${mainColors.undone};
`;
