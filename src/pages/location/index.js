import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox} from 'react-native';

// Import Screens
import Mainpage from './mainpage';
import Streetview from './streetview';
import Routeview from './routeview';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Location = () => {
  return (
    <Stack.Navigator initialRouteName="Mainpage">
      <Stack.Screen
        name="Mainpage"
        component={Mainpage}
        options={{
          title: 'Map',
        }}
      />
      <Stack.Screen
        name="StreetView"
        component={Streetview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Routeview"
        component={Routeview}
        options={{title: 'Your Route'}}
      />
    </Stack.Navigator>
  );
};

export default Location;
