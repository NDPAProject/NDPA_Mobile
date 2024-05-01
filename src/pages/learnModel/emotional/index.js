import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartEmotionalSection from './startEmotionalPart';
import EmotionalSection from './emotionalPart';
import PercentEmotionalSection from './percentEmotionalPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainEmotionalSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartEmotionalSection">
      <Stack.Screen
        name="StartEmotionalSection"
        component={StartEmotionalSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="EmotionalSection"
        component={EmotionalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentEmotionalSection"
        component={PercentEmotionalSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainEmotionalSection;
