import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartWithdrawalSection from './startWithdrawalPart';
import WithdrawalSection from './withdrawalPart';
import HelpWithdrawalSection from './helpWithdrawalPart';
import PracticeWithdrawalSection from './practiceWithdrawalPart';
import PercentWithdrawalSection from './percentWithdrawalPart';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainWithdrawalSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartWithdrawalSection">
      <Stack.Screen
        name="StartWithdrawalSection"
        component={StartWithdrawalSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="WithdrawalSection"
        component={WithdrawalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpWithdrawalSection"
        component={HelpWithdrawalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticeWithdrawalSection"
        component={PracticeWithdrawalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentWithdrawalSection"
        component={PercentWithdrawalSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainWithdrawalSection;
