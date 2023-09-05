import { FlatList, ActivityIndicator, Animated, Easing } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import { MainNavigationList, MainScreens } from '../../../types/navigation';
import Todo from '../components/Todo/Todo';
import { useGetTodosQuery } from '../../../services/todosApi';
import {
  Filter,
  FilterText,
  Filters,
  Header,
  HeaderTitle,
  NoTodos,
  Separator,
  Wrapper,
} from './styled';
import { setTodos } from '../../../store/todos';
import { RootState, TodoInterface } from '../../../types/store';
import { colors } from '../../../constants/colors';
import {
  loadTodosFromStorage,
  saveTodosToStorage,
} from '../../../helpers/storage';

const Todos: FC<
  NativeStackNavigationProp<MainNavigationList, MainScreens.Todos>
> = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const fadeRef = useRef<Animated.CompositeAnimation | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>();
  const [color, setColor] = useState<string>(colors.sunset);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const { data, isLoading, error, refetch } = useGetTodosQuery('');
  const ref = firestore().collection('todos');
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainNavigationList>>();

  const goToAddTodo = () => navigate(MainScreens.AddTodo);

  const getColor = () => {
    const color = Object.values(colors);
    const randomIndex = Math.floor(Math.random() * color.length);

    setColor(color[randomIndex].toString());
  };

  const filterTodos = (filter: string) => {
    switch (filter) {
      case 'all':
        setFilteredTodos([...todos]);
        setActiveFilter(filter);
        return;
      case 'done':
        setFilteredTodos([
          ...todos.filter((todo: TodoInterface) => todo.complete),
        ]);
        setActiveFilter(filter);
        return;
      case 'undone':
        setFilteredTodos([
          ...todos.filter((todo: TodoInterface) => !todo.complete),
        ]);
        setActiveFilter(filter);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    filterTodos('all');
  }, [todos]);

  useEffect(() => {
    getColor();

    fadeRef.current = Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    fadeRef.current.start();

    return () => {
      if (fadeRef.current) {
        fadeRef.current.stop();
        fadeRef.current.reset();
      }
    };
  }, [data?.length]);

  useEffect(() => {
    if (todos) {
      saveTodosToStorage(todos);
    }
  }, [todos]);

  useEffect(() => {
    if (error) {
      const loadTodos = async () => {
        const storedTodos = await loadTodosFromStorage();

        dispatch(setTodos(storedTodos));
      };

      loadTodos();
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setTodos(data));
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type) {
          refetch();
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Animated.View style={[{ opacity: fade }]}>
        <Header backgroundColor={color} onPress={goToAddTodo}>
          <HeaderTitle children="ADD TODO" />
          <Icon name="plus-circle" size={60} color="#ffffff" />
        </Header>
      </Animated.View>
      <Filters>
        <Filter
          active={activeFilter === 'all'}
          onPress={() => filterTodos('all')}>
          <FilterText children="All" />
        </Filter>
        <Filter
          active={activeFilter === 'done'}
          onPress={() => filterTodos('done')}>
          <FilterText children="Done" />
        </Filter>
        <Filter
          active={activeFilter === 'undone'}
          onPress={() => filterTodos('undone')}>
          <FilterText children="Undone" />
        </Filter>
      </Filters>
      {!todos.length && !isLoading && (
        <NoTodos children="Add your first TODO" />
      )}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Todo todo={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}
    </Wrapper>
  );
};

export default Todos;
