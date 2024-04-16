import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
// import SENPass from './senPass';
import SettingPage from './setting';
import PersonalInfoPage from './personalInfo';
import ChangePwdPage from './changePwd';
import TimeSupportPage from './timeSupport';
import TimeSettingPage from './timeSet';
import IdVerificationPage from './idVerification';
import IdVerificationList from './idVeriList';
import SENPassportPage from './senPass';
// import AccessMenu from './accessMenu';
// import CallKey from './callKey';
// import EditAvatar from './editAvatar';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="SettingPage">
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalInfoPage"
        component={PersonalInfoPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePwdPage"
        component={ChangePwdPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimeSupportPage"
        component={TimeSupportPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TimeSettingPage"
        component={TimeSettingPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IdVerificationPage"
        component={IdVerificationPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IdVerificationList"
        component={IdVerificationList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SENPassportPage"
        component={SENPassportPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
