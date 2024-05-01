import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import StartPeerSection from './startPeerPart';
import PeerSection from './peerPart';
import PracticePeerSection from './practicePeerPart';
import PercentPeerSection from './percentPeerPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainPeerSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartPeerSection">
      <Stack.Screen
        name="StartPeerSection"
        component={StartPeerSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="PeerSection"
        component={PeerSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PracticePeerSection"
        component={PracticePeerSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentPeerSection"
        component={PercentPeerSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainPeerSection;
