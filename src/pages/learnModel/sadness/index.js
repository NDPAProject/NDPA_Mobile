import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
// import ReviewActSection from './reviewPart';
import StartSadnessSection from './startSadnessPart';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainSadnessSection = () => {
  return (
    <Stack.Navigator initialRouteName="StartSadnessSection">
      <Stack.Screen
        name="StartSadnessSection"
        component={StartSadnessSection}
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

export default MainSadnessSection;
