import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/001_home';
import Events from './src/pages/002_events';
import {DateInfo} from './src/type';

type EventsProps = {
  dateInfo: DateInfo;
};

export type RootStackParamList = {
  Home: undefined;
  Events: EventsProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Events" component={Events} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
