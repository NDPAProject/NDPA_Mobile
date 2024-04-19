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
import Location from '../location/index';
import Footer from '../../components/footer';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const LocationTutoroal = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="MainpageTutorial">
        <Stack.Screen
          name="MainpageTutorial"
          component={Mainpage}
          options={{
            title: 'Map',
          }}
        />

        <Stack.Screen
          name="RoutepageTutorial"
          component={Routepage}
          options={{title: 'Your Route'}}
        />

        <Stack.Screen
          name="StreetviewTutorial"
          component={Streetview}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RouteviewTutorial"
          component={Routeview}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={3} />
    </View>
  );
};

export default LocationTutoroal;
