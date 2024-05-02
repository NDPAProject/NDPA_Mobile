import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartLossSection from './startLossPart';
import LossSection from './lossPart';
import HelpLossSection from './helpLossPart';
import PracticeLossSection from './practiceLossPart';
import PercentLossSection from './percentLossPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainLossSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartLossSection">
      <Stack.Screen
        name="StartLossSection"
        component={StartLossSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="LossSection"
        component={LossSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpLossSection"
        component={HelpLossSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeLossSection"
        component={PracticeLossSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentLossSection"
        component={PercentLossSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainLossSection;
