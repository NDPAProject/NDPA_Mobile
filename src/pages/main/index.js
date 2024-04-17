import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
//
// Import Screens
import MainPage from './mainPage';
import TypingSection from '../learnTutorial/typingTutor';
import SpeakingSection from '../learnTutorial/speakingTutor';
import ReviewSection from '../learnTutorial/reviewTutor';
import MainLearningSection from '../learn';

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
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
        name="MainLearningSection"
        component={MainLearningSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
