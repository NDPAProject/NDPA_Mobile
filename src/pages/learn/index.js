import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import TypingSection from './typingPart';
import SpeakingSection from './speakingPart';
import ReviewSection from './reviewPart';
import StartPersonalSection from './personalIdPart';
import PercentSection from './percentPersonalPart';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const MainLearningSection = () => {
  return (
    <Stack.Navigator initialRouteName="PercentSection">
      <Stack.Screen
        name="StartPersonalSection"
        component={StartPersonalSection}
        options={{headerShown: false}}
        initialParams={{param: false}}
      />
      <Stack.Screen
        name="TypingSection"
        component={TypingSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpeakingSection"
        component={SpeakingSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewSection"
        component={ReviewSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PercentSection"
        component={PercentSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainLearningSection;
