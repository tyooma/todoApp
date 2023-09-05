import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Todos from './Todos/Todos';
import AddTodo from './AddTodo/AddTodo';
import { MainNavigationList, MainScreens } from '../../types/navigation';

type Props = {};

const Stack = createNativeStackNavigator<MainNavigationList>();

const MainStack = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name={MainScreens.Todos} component={Todos} />
        <Stack.Screen name={MainScreens.AddTodo} component={AddTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
