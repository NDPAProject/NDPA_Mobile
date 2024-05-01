import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
// import ReviewActSection from './reviewPart';
import StartOverallSection from './startOverallPart';
import OverallSection from './overallPart';
import PracticeOverallSection from './practiceOverallPart';
import PercentOverallSection from './percentOverallPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainOverallSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartOverallSection">
      <Stack.Screen
        name="StartOverallSection"
        component={StartOverallSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="OverallSection"
        component={OverallSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeOverallSection"
        component={PracticeOverallSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentOverallSection"
        component={PercentOverallSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainOverallSection;
