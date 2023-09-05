import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { mainColors } from '../../../../constants/colors';
import { Item, Title, Trash, Wrapper } from './styled';
import {
  useCheckTodoMutation,
  useDeleteTodoMutation,
} from '../../../../services/todosApi';
import { TodoInterface } from '../../../../types/store';

type Props = {
  todo: TodoInterface;
};

const Todo = ({ todo }: Props) => {
  const fade = useRef(new Animated.Value(1)).current;
  const [checkTodo] = useCheckTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const fadeOut = (duration: number) => {
    Animated.timing(fade, {
      toValue: 0,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const checkHandler = () => checkTodo(todo);

  const deleteHandler = () => {
    fadeOut(500);
    setTimeout(() => {
      deleteTodo(todo);
    }, 100);
  };

  return (
    <Animated.View style={[{ opacity: fade }]}>
      <Wrapper onPress={checkHandler}>
        <Item>
          <Icon
            name={todo.complete ? 'check-circle' : 'circle'}
            color={todo.complete ? mainColors.done : mainColors.undone}
            size={30}
          />
          <Title complete={todo.complete} children={todo.title} />
        </Item>
        <Trash onPress={deleteHandler}>
          <Icon name="trash-2" color={mainColors.undone} size={30} />
        </Trash>
      </Wrapper>
    </Animated.View>
  );
};

export default Todo;
