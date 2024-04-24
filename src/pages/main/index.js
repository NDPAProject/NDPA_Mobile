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
import TypingTutorSection from '../learnTutorial/typingTutor';
import SpeakingTutorSection from '../learnTutorial/speakingTutor';
import ReviewTutorSection from '../learnTutorial/reviewTutor';
import MainLearningSection from '../learn/index';
import MainChoiceSection from '../choice/index';
import Location from '../location';

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
        name="TypingTutorSection"
        component={TypingTutorSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpeakingTutorSection"
        component={SpeakingTutorSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewTutorSection"
        component={ReviewTutorSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainLearningSection"
        component={MainLearningSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainChoiceSection"
        component={MainChoiceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
