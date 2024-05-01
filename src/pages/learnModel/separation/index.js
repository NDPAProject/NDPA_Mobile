import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//
import StartSeparationSection from './startSeparationPart';
import SeparationSection from './separationPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainSeparationSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartSeparationSection">
      <Stack.Screen
        name="StartSeparationSection"
        component={StartSeparationSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="SeparationSection"
        component={SeparationSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainSeparationSection;
