import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapDisplay from '../map/MapDisplay';
import CalendarDisplay from '../calendar/CalendarDisplay';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
      <RootStack.Screen name="Calendar" component={CalendarDisplay} />
        <RootStack.Screen name="Map" component={MapDisplay} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;