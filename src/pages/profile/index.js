import 'react-native-gesture-handler';

// Import React
import React from 'react';
// Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//
// Import Screens
import MainPage from './mainPage';
// import SENPass from './senPass';
import SettingPart from './setting/index';
import AccessMenu from './accessMenu/index';
// import CallKey from './callKey';
// import EditAvatar from './editAvatar';
import Footer from '../../components/footer';
import {LogBox, View} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Main = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
          initialParams={{param: false}}
        />
        <Stack.Screen
          name="SettingPart"
          component={SettingPart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccessMenu"
          component={AccessMenu}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={4} />
    </View>
  );
};

export default Main;
