import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
// import ReviewActSection from './reviewPart';
import StartWorrySection from './startWorryPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainWorrySection = () => {
  return (
    <Stack.Navigator initialRouteName="StartWorrySection">
      <Stack.Screen
        name="StartWorrySection"
        component={StartWorrySection}
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

export default MainWorrySection;
