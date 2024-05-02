import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartEmpathySection from './startEmpathyPart';
import EmpathySection from './empathyPart';
import PercentEmpathySection from './percentEmpathyPart';
import HelpEmpathySection from './helpEmpathyPart';
import PracticeEmpathySection from './practiceEmpathyPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainEmpathySection = () => {
  return (
    <Stack.Navigator initialRouteName="StartEmpathySection">
      <Stack.Screen
        name="StartEmpathySection"
        component={StartEmpathySection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="EmpathySection"
        component={EmpathySection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentEmpathySection"
        component={PercentEmpathySection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpEmpathySection"
        component={HelpEmpathySection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeEmpathySection"
        component={PracticeEmpathySection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainEmpathySection;
