import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import { MainNavigationList, MainScreens } from '../../../types/navigation';
import { mainColors } from '../../../constants/colors';
import {
  AddButton,
  AddButtonText,
  BackButton,
  Input,
  Placeholder,
  Wrapper,
} from './styled';
import { useAddTodoMutation } from '../../../services/todosApi';

const AddTodo: FC<
  NativeStackNavigationProp<MainNavigationList, MainScreens.AddTodo>
> = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>('');
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<MainNavigationList>>();
  const [addTodo] = useAddTodoMutation();

  const goBackToTodoList = () => goBack();

  const addTodoHandler = async () => {
    await addTodo({ title: todo });

    navigate(MainScreens.Todos);
  };

  return (
    <Wrapper>
      <BackButton onPress={goBackToTodoList}>
        <Icon name="chevron-left" size={30} color={mainColors.allblack} />
      </BackButton>
      {!focused && <Placeholder children="What need to be done?" />}
      <Input
        multiline={true}
        numberOfLines={6}
        value={todo}
        onChangeText={setTodo}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <AddButton
        disabled={todo.length ? false : true}
        onPress={todo.length ? addTodoHandler : () => {}}>
        <AddButtonText children="Add TODO" />
      </AddButton>
    </Wrapper>
  );
};

export default AddTodo;
