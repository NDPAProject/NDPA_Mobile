import 'react-native-gesture-handler';

// Import React
import React from 'react';

// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import MainPage from './mainPage';
import LearnSection from '../learn/index';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LearnSection"
        component={LearnSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
