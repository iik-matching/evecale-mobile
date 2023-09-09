import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/home';
import Page1 from './components/page1';

export type RootStackParamList = {
  Home: undefined;
  Page1: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Page1" component={Page1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
