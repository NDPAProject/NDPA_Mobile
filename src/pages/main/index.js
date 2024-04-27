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
import MainChoiceSection from '../learnModel/choice/index';
import MainFriendShipSection from '../learnModel/friendShip/index';
import MainIndependenceSection from '../learnModel/independence/index';
import MainSeparationSection from '../learnModel/separation/index';
import MainLossSection from '../learnModel/loss/index';
import MainWithdrawalSection from '../learnModel/loss/index';
import MainSadnessSection from '../learnModel/sadness/index';
import MainWorrySection from '../learnModel/worry/index';
import MainEmotionalSection from '../learnModel/emotional/index';
import MainPeerSection from '../learnModel/peer';
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
        name="MainFriendShipSection"
        component={MainFriendShipSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainIndependenceSection"
        component={MainIndependenceSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainSeparationSection"
        component={MainSeparationSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainWithdrawalSection"
        component={MainWithdrawalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainLossSection"
        component={MainLossSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainSadnessSection"
        component={MainSadnessSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainWorrySection"
        component={MainWorrySection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainEmotionalSection"
        component={MainEmotionalSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainPeerSection"
        component={MainPeerSection}
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
