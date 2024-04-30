import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import WeeklyActSection from './weeklyActPart';
import WeeklyActPlanSection from './weeklyPlanPart';
import ReviewActSection from './reviewPart';
import StartChoiceSection from './startChoicePart';
import PersonalChoiceSection from './percentChoicePart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainChoiceSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartChoiceSection">
      <Stack.Screen
        name="StartChoiceSection"
        component={StartChoiceSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="WeeklyActSection"
        component={WeeklyActSection}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="WeeklyActPlanSection"
        component={WeeklyActPlanSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewActSection"
        component={ReviewActSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalChoiceSection"
        component={PersonalChoiceSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainChoiceSection;
