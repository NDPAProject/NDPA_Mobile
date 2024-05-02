import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import SetTimeSection from './setTimerPart';
import StartIndependenceSection from './startIndependencePart';
import IndependenceSection from './independencePart';
import TimerWorkSection from './timerWorkPart';
import PercentIndependenceSection from './percentIndependencePart';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainIndependenceSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartIndependenceSection">
      <Stack.Screen
        name="StartIndependenceSection"
        component={StartIndependenceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetTimeSection"
        component={SetTimeSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndependenceSection"
        component={IndependenceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimerWorkSection"
        component={TimerWorkSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentIndependenceSection"
        component={PercentIndependenceSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainIndependenceSection;
