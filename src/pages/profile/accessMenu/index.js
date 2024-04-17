import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import AccessMenuPage from './accessMenu';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="AccessMenuPage">
      <Stack.Screen
        name="AccessMenuPage"
        component={AccessMenuPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
