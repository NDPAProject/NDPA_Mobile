import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox, View} from 'react-native';

// Import Screens
import Mainpage from './mainpage';
import Streetview from './streetview';
import Routepage from './routepage';
import Routeview from './routeview';
import Footer from '../../components/footer';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Location = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Mainpage">
        <Stack.Screen
          name="Mainpage"
          component={Mainpage}
          options={{
            title: 'Map',
          }}
        />

        <Stack.Screen
          name="Routepage"
          component={Routepage}
          options={{title: 'Your Route'}}
        />

        <Stack.Screen
          name="Streetview"
          component={Streetview}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Routeview"
          component={Routeview}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={3} />
    </View>
  );
};

export default Location;
