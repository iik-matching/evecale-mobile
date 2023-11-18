import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/001_home';
import Events from './src/pages/002_events';
import Filter from './src/pages/003_filter';
import Header from './src/components/Header';

type EventsProps = {
  year: number;
  month: number;
  day: number;
};

export type RootStackParamList = {
  Home: undefined;
  Events: EventsProps;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Filter" component={Filter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
