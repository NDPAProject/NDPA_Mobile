import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartWorrySection from './startWorryPart';
import WorrySection from './worryPart';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainWorrySection = () => {
  return (
    <Stack.Navigator initialRouteName="StartWorrySection">
      <Stack.Screen
        name="StartWorrySection"
        component={StartWorrySection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="WorrySection"
        component={WorrySection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainWorrySection;
