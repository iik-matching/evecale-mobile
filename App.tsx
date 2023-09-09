import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calender from './src/pages/001_calendar';
import Events from './src/pages/002_events';

export type RootStackParamList = {
  Home: undefined;
  Calender: undefined;
  Events: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Events" component={Events} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
