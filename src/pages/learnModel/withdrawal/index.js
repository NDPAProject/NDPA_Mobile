import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
// import ReviewActSection from './reviewPart';
import StartWithdrawalSection from './startWithdrawalPart';

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
      {/* <Stack.Screen
        name="ReviewActSection"
        component={ReviewActSection}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default MainWithdrawalSection;
