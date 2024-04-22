import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import MainPage from './mainPage';
import MainSearchSection from './search/index';
import TemplateSection from './template/templatePage';
import ScanSection from './scan/scanPage';
import DrawSection from './draw/drawPage';
import {LogBox, View} from 'react-native';

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
        name="MainSearchSection"
        component={MainSearchSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TemplateSection"
        component={TemplateSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanSection"
        component={ScanSection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrawSection"
        component={DrawSection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Main;
