import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import AppearanceSection from './appearancePart';
import StartFriendShipSection from './startFriendShipPart';
import QualitiesSection from './qualitiesPart';
import ReviewFriendSection from './reviewFriendShipPart';
import PercentFriendShipSection from './percentFriendShipPart';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainFriendShipSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartFriendShipSection">
      <Stack.Screen
        name="StartFriendShipSection"
        component={StartFriendShipSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppearanceSection"
        component={AppearanceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QualitiesSection"
        component={QualitiesSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewFriendSection"
        component={ReviewFriendSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentFriendShipSection"
        component={PercentFriendShipSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainFriendShipSection;
