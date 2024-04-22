import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import CreateComicSection from './createComic/index';
import MyContentSection from './myContent/index';
import ForYouSection from './forYou/index';
import Footer from '../../components/footer';
import {LogBox, View} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const CommunitySection = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="MyContentSection">
        <Stack.Screen
          name="MyContentSection"
          component={MyContentSection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateComicSection"
          component={CreateComicSection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForYouSection"
          component={ForYouSection}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={2} />
    </View>
  );
};

export default CommunitySection;
